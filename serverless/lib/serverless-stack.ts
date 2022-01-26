import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { RestApi, LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { Bucket, BucketEncryption, EventType } from "aws-cdk-lib/aws-s3";
import { ServicePrincipal, ManagedPolicy, Role } from "aws-cdk-lib/aws-iam";
import { LambdaDestination } from "aws-cdk-lib/aws-s3-notifications";
import { Table, AttributeType } from "aws-cdk-lib/aws-dynamodb";
export class ServerlessStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    //Phase I

    const reportsBucket = new Bucket(this, "reportsBucket", {
      bucketName: "cymotive-reports-bucket",
      encryption: BucketEncryption.S3_MANAGED,
    });

    const porterRole = new Role(this, "roleLambdaPorter", {
      roleName: "porterRole",
      assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSLambdaBasicExecutionRole"
        ),
      ],
    });
    reportsBucket.grantWrite(porterRole);

    const porterLambda = new NodejsFunction(this, "porter", {
      functionName: "porter",
      entry: "./resource/porter.ts",
      handler: "handler",
      role: porterRole,
      environment: {
        BUCKET: reportsBucket.bucketName,
      },
    });

    //Phase II

    const idsTable = new Table(this, "ids-table", {
      partitionKey: { name: "vehicleId", type: AttributeType.STRING },
      sortKey: { name: "label", type: AttributeType.STRING },
      tableName: "ids-table",
      readCapacity: 5,
      writeCapacity: 5,
    });

    const ingestRole = new Role(this, "roleLambdaIngest", {
      roleName: "ingestRole",
      assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSLambdaBasicExecutionRole"
        ),
      ],
    });
    reportsBucket.grantRead(ingestRole);
    idsTable.grantWriteData(ingestRole);

    const ingestLambda = new NodejsFunction(this, "ingest", {
      functionName: "ingest",
      entry: "./resource/ingest.ts",
      handler: "handler",
      role: ingestRole,
      timeout: Duration.minutes(1),
      environment: {
        DDBTABLE: idsTable.tableName,
      },
    });

    reportsBucket.addEventNotification(
      EventType.OBJECT_CREATED,
      new LambdaDestination(ingestLambda),
      { suffix: ".json" }
    );

    //Phase III

    const analyzerRole = new Role(this, "roleLambdaAnalyzer", {
      roleName: "analyzerRole",
      assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSLambdaBasicExecutionRole"
        ),
      ],
    });
    idsTable.grantReadData(analyzerRole);

    const analyzerLambda = new NodejsFunction(this, "analyzer", {
      functionName: "analyzer",
      entry: "./resource/analyzer.ts",
      handler: "handler",
      role: analyzerRole,
      timeout: Duration.seconds(10),
      environment: {
        DDBTABLE: idsTable.tableName,
      },
    });

    const idsgateway = new RestApi(this, "idsgateway", {
      restApiName: "idsgateway",
      deployOptions: { stageName: "dev" },
    });
    const porterIntegration = new LambdaIntegration(porterLambda);
    const analyzerIntegration = new LambdaIntegration(analyzerLambda);

    idsgateway.root.addMethod("POST", porterIntegration);

    const numOfReportsResource = idsgateway.root.addResource("numberofreports");
    numOfReportsResource.addMethod("GET", analyzerIntegration);
    numOfReportsResource.addCorsPreflight({
      allowOrigins: ["*"],
      allowHeaders: ["*"],
      allowCredentials: true,
      allowMethods: ["*"],
    });
    const numOfVehiclesResource =
      idsgateway.root.addResource("numberofvehicles");
    numOfVehiclesResource.addCorsPreflight({
      allowOrigins: ["*"],
      allowHeaders: ["*"],
      allowCredentials: true,
      allowMethods: ["*"],
    });
    numOfVehiclesResource.addMethod("GET", analyzerIntegration);
    const numOfAnomaliesResource =
      idsgateway.root.addResource("numberofanomalies");
    numOfAnomaliesResource.addCorsPreflight({
      allowOrigins: ["*"],
      allowHeaders: ["*"],
      allowCredentials: true,
      allowMethods: ["*"],
    });
    numOfAnomaliesResource.addMethod("GET", analyzerIntegration);
  }
}

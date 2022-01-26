import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as Lambda from "aws-cdk-lib/aws-lambda-nodejs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as iam from "aws-cdk-lib/aws-iam";
import * as s3n from "aws-cdk-lib/aws-s3-notifications";
import * as ddb from "aws-cdk-lib/aws-dynamodb";
export class ServerlessStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const reportsBucket = new s3.Bucket(this, "reportsBucket", {
      bucketName: "cymotive-reports-bucket",
      encryption: s3.BucketEncryption.S3_MANAGED,
    });
    const porterRole = new iam.Role(this, "roleLambdaPorter", {
      roleName: "porterRole",
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSLambdaBasicExecutionRole"
        ),
      ],
    });
    const ingestRole = new iam.Role(this, "roleLambdaIngest", {
      roleName: "ingestRole",
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSLambdaBasicExecutionRole"
        ),
      ],
    });
    reportsBucket.grantWrite(porterRole);
    reportsBucket.grantRead(ingestRole);
    const porterLambda = new Lambda.NodejsFunction(this, "porter", {
      functionName: "porter",
      entry: "./resource/porter.ts",
      handler: "handler",
      role: porterRole,
      environment: {
        BUCKET: reportsBucket.bucketName,
      },
    });

    const idsTable = new ddb.Table(this, "ids-table", {
      partitionKey: { name: "vehicleId", type: ddb.AttributeType.STRING },
      sortKey: { name: "label", type: ddb.AttributeType.STRING },
      tableName: "ids-table",
      readCapacity: 5,
      writeCapacity: 5,
    });

    idsTable.grantWriteData(ingestRole);
    const ingestLambda = new Lambda.NodejsFunction(this, "ingest", {
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
      s3.EventType.OBJECT_CREATED,
      new s3n.LambdaDestination(ingestLambda),
      { suffix: ".json" }
    );

    const idsgateway = new apigateway.RestApi(this, "idsgateway", {
      restApiName: "idsgateway",
    });

    const porterIntegration = new apigateway.LambdaIntegration(porterLambda);
    idsgateway.root.addMethod("POST", porterIntegration);
  }
}

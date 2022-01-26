import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as Lambda from "aws-cdk-lib/aws-lambda-nodejs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";

export class ServerlessStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const idsgateway = new apigateway.RestApi(this, "idsgateway", {
      restApiName: "idsgateway",
    });

    const porterLambda = new Lambda.NodejsFunction(this, "porter", {
      functionName: "porter",
      handler,
    });

    const porterIntegration = new apigateway.LambdaIntegration(porterLambda);
    idsgateway.root.addMethod("POST", porterIntegration);
  }
}

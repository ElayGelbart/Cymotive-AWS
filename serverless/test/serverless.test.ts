import * as cdk from "aws-cdk-lib";
import { Match, Template } from "aws-cdk-lib/assertions";
import * as Serverless from "../lib/serverless-stack";
describe("StackTests", () => {
  const app = new cdk.App();
  const stack = new Serverless.ServerlessStack(app, "MyTestStack");
  const template = Template.fromStack(stack);
  test("S3 bucket Creation with correct name and encryption", () => {
    template.hasResourceProperties("AWS::S3::Bucket", {
      BucketName: "cymotive-reports-bucket",
      BucketEncryption: {
        ServerSideEncryptionConfiguration: [
          {
            ServerSideEncryptionByDefault: {
              SSEAlgorithm: "AES256",
            },
          },
        ],
      },
    });
  });
  test("Lambda Creation", () => {
    template.hasResourceProperties("AWS::Lambda::Function", {
      FunctionName: "porter",
      Environment: {
        Variables: {
          BUCKET: {
            Ref: Match.anyValue(),
          },
          AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
        },
      },
      Runtime: "nodejs14.x",
    });
    template.hasResourceProperties("AWS::Lambda::Function", {
      FunctionName: "ingest",
      Environment: {
        Variables: {
          DDBTABLE: {
            Ref: Match.anyValue(),
          },
          AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
        },
      },
      Runtime: "nodejs14.x",
    });
    template.hasResourceProperties("AWS::Lambda::Function", {
      FunctionName: "analyzer",
      Environment: {
        Variables: {
          DDBTABLE: {
            Ref: Match.anyValue(),
          },
          AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
        },
      },
      Runtime: "nodejs14.x",
    });
  });
  test("DynamoDB", () => {
    template.hasResourceProperties("AWS::DynamoDB::Table", {
      KeySchema: [
        {
          AttributeName: "vehicleId",
          KeyType: "HASH",
        },
        {
          AttributeName: "label",
          KeyType: "RANGE",
        },
      ],
      AttributeDefinitions: [
        {
          AttributeName: "vehicleId",
          AttributeType: "S",
        },
        {
          AttributeName: "label",
          AttributeType: "S",
        },
      ],
      TableName: "ids-table",
    });
  });
  test("ApiGateway", () => {
    template.hasResourceProperties("AWS::ApiGateway::Stage", {
      StageName: "dev",
    });
    template.hasResourceProperties("AWS::ApiGateway::RestApi", {
      Name: "idsgateway",
    });
  });
});

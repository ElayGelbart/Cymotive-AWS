import { APIGatewayProxyHandler } from "aws-lambda";
import * as AWS from "aws-sdk";

export const handler: APIGatewayProxyHandler = async (event) => {
  return { statusCode: 200, body: "good4u" };
};

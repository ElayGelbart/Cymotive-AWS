import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { nanoid } from "nanoid";
import * as AWS from "aws-sdk";
const s3 = new AWS.S3({ region: "eu-west-1" });

const bucketName = process.env.BUCKET || "cymotive-reports-test";

export const handler = async (event: APIGatewayProxyEvent) => {
  const ranID = nanoid();
  const params = {
    Body: event.body as string,
    Bucket: bucketName as string,
    Key: `${ranID}.json`,
  };
  try {
    if (!event.body) {
      throw new Error("Please Add Body");
    }
    const s3Response = await s3.putObject(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(s3Response),
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify(err),
    };
  }
};

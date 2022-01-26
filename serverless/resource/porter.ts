import { APIGatewayProxyHandler } from "aws-lambda";
import { nanoid } from "nanoid";
import * as AWS from "aws-sdk";
const s3 = new AWS.S3();

const bucketName = process.env.BUCKET;

export const handler: APIGatewayProxyHandler = async (event) => {
  const ranID = nanoid();
  console.log("event", event, event.body);
  const params = {
    Body: event.body as string,
    Bucket: bucketName as string,
    Key: `${ranID}.json`,
  };
  try {
    const s3Response = await s3
      .putObject(params, (err, data) => {
        if (err) {
          throw err;
        }
        return data;
      })
      .promise();
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

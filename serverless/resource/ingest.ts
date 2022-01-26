import { S3Event } from "aws-lambda";
import * as AWS from "aws-sdk";
const s3 = new AWS.S3();
const ddb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.DDBTABLE as string;

export const handler = async (event: S3Event) => {
  const s3Params = {
    Bucket: event.Records[0].s3.bucket.name,
    Key: event.Records[0].s3.object.key,
    ResponseContentType: "application/json",
  };
  console.log("s3Params", s3Params);
  try {
    const reportFile = await s3
      .getObject(s3Params, (err, data) => {
        if (err) {
          throw err;
        }
        return data;
      })
      .promise();
    if (!reportFile.Body) {
      throw reportFile;
    }
    const reportObj = JSON.parse(reportFile.Body.toString());
    console.log(typeof reportObj);
    const DDBputItem = async (item: any) => {
      console.log(item);
      console.log(tableName);
      const dynamoParams = {
        TableName: tableName,
        Item: item,
      };
      await ddb
        .put(dynamoParams, (err, data) => {
          if (err) {
            throw err;
          }
          return data;
        })
        .promise();
    };
    if (Array.isArray(reportObj)) {
      for (let item of reportObj) {
        await DDBputItem(item);
      }
    } else {
      await DDBputItem(reportObj);
    }
    return { statusCode: 200, body: "Item/s In Table" };
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify(err) };
  }
};

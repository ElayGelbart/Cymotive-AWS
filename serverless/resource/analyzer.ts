import * as AWS from "aws-sdk";
import { APIGatewayProxyHandler } from "aws-lambda";
const ddb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.DDBTABLE as string;
export const handler: APIGatewayProxyHandler = async (event) => {
  let resBody = "RESPONSE";
  let resStatusCode = 200;
  const { path } = event;
  if (path === "/numberOfReports") {
    const params = { TableName: tableName };
    const result = await ddb
      .scan(params, (err, data) => {
        if (err) return "";
        return data;
      })
      .promise();
    if (!result.Items) {
      resBody = "internal error";
      resStatusCode = 500;
    } else {
      resBody = JSON.stringify(result.Items.length);
    }
  } else if (path === "/numberofvehicles") {
    const params = { TableName: tableName };
    const result = await ddb
      .scan(params, (err, data) => {
        if (err) return "";
        return data;
      })
      .promise();
    if (!result.Items) {
      resBody = "internal error";
      resStatusCode = 500;
    } else {
      const diffVehiclesArr = [
        ...new Set(result.Items.map((res) => res.label)),
      ];
      console.log(diffVehiclesArr);
      const vehiclesNum = diffVehiclesArr.length;
      resBody = JSON.stringify(vehiclesNum);
    }
  } else if (path === "/numberofanomalies") {
    const params = { TableName: tableName };
    let anomalies = 0;
    const result = await ddb
      .scan(params, (err, data) => {
        if (err) return "";
        return data;
      })
      .promise();
    if (!result.Items) {
      resBody = "failed";
    } else {
      for (let report of result.Items) {
        const { windows, airBag, infotainment } = report.signalsPerMinute;

        if (
          windows.sum > windows.acceptableMaxValue ||
          windows.sum < windows.acceptableMinValue
        ) {
          anomalies++;
        }
        if (
          airBag.sum > airBag.acceptableMaxValue ||
          airBag.sum < airBag.acceptableMinValue
        ) {
          anomalies++;
        }
        if (
          infotainment.sum > infotainment.acceptableMaxValue ||
          infotainment.sum < infotainment.acceptableMinValue
        ) {
          anomalies++;
        }
      }
      resBody = JSON.stringify(anomalies);
    }
  }
  return { statusCode: resStatusCode, body: resBody };
};

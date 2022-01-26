import { DynamoDB } from "aws-sdk";
import { APIGatewayProxyEvent } from "aws-lambda"; //Typescript
const ddb = new DynamoDB.DocumentClient({ region: "eu-west-1" });
const tableName = (process.env.DDBTABLE as string) || "ids-table-test";
export const handler = async (event: APIGatewayProxyEvent) => {
  let resBody = "RESPONSE";
  let resStatusCode = 200;
  const { path } = event;
  const params = { TableName: tableName };
  try {
    if (path === "/numberofreports") {
      const result = await ddb.scan(params).promise();
      resBody = JSON.stringify(result.Items?.length);
    } else if (path === "/numberofvehicles") {
      const result = await ddb.scan(params).promise();
      const diffVehiclesArr = [
        ...new Set(result.Items?.map((res) => res.label)),
      ];
      resBody = JSON.stringify(diffVehiclesArr.length);
    } else if (path === "/numberofanomalies") {
      let anomalies = 0;
      const result = await ddb.scan(params).promise();
      if (!result.Items) {
        throw result;
      }
      for (let report of result.Items) {
        const { signalsPerMinute } = report;
        for (let item in signalsPerMinute) {
          if (
            signalsPerMinute[item].sum >
              signalsPerMinute[item].acceptableMaxValue ||
            signalsPerMinute[item].sum <
              signalsPerMinute[item].acceptableMinValue
          ) {
            anomalies++;
          }
        }
      }
      resBody = JSON.stringify(anomalies);
    }
  } catch (err) {
    resBody = JSON.stringify(err);
    resStatusCode = 500;
  }
  return { statusCode: resStatusCode, body: resBody };
};

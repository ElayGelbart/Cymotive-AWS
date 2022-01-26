import * as analyzer from "../resource/analyzer";
import { APIGatewayProxyEvent } from "aws-lambda";
import * as httpEvent from "./events/eventApiGateway";

describe("Testing analyzer lambda function", () => {
  const goodGetNumOfVehiclesEvent =
    httpEvent.goodGetNumOfVehiclesEvent as unknown as APIGatewayProxyEvent;
  test("Get Number Of Vehicles", async () => {
    const result = (await analyzer.handler(goodGetNumOfVehiclesEvent)) as {
      statusCode: number;
      body: string;
    };
    expect(result.statusCode).toBe(200);
    expect(Number(result.body)).toBeGreaterThan(0);
  });

  const goodGetNumOfReportsEvent =
    httpEvent.goodGetNumOfReportsEvent as unknown as APIGatewayProxyEvent;
  test("Get Number Of Reports", async () => {
    const result = (await analyzer.handler(goodGetNumOfReportsEvent)) as {
      statusCode: number;
      body: string;
    };
    expect(result.statusCode).toBe(200);
    expect(Number(result.body)).toBeGreaterThan(0);
  });

  const goodGetNumOfAnomaliesEvent =
    httpEvent.goodGetNumOfAnomaliesEvent as unknown as APIGatewayProxyEvent;
  test("Get Number Of Anomalies", async () => {
    const result = (await analyzer.handler(goodGetNumOfAnomaliesEvent)) as {
      statusCode: number;
      body: string;
    };
    expect(result.statusCode).toBe(200);
    expect(Number(result.body)).toBeGreaterThan(0);
  });
});

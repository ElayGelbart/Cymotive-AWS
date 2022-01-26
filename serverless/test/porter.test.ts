import * as porter from "../resource/porter";
import { APIGatewayProxyEvent } from "aws-lambda";
import * as httpEvent from "./events/eventApiGateway";

describe("Testing porter lambda function", () => {
  const goodHttpEvent =
    httpEvent.goodPostEvent as unknown as APIGatewayProxyEvent;
  const badHttpEvent =
    httpEvent.badPostEvent as unknown as APIGatewayProxyEvent;
  test("Save JSON body to S3", async () => {
    const result = (await porter.handler(goodHttpEvent)) as {
      statusCode: number;
      body: string;
    };
    expect(result.statusCode).toBe(200);
    expect(result.body.match(/ETAG/i)).toBeTruthy();
  });
  test("empty body will get 400", async () => {
    const result = (await porter.handler(badHttpEvent)) as {
      statusCode: number;
      body: string;
    };
    expect(result.statusCode).toBe(400);
    expect(result.body.match(/ETAG/i)).toBeFalsy();
  });
});

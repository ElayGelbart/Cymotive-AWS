import * as ingest from "../resource/ingest";
import * as s3Event from "./events/s3AddObj";

describe("Testing ingest lambda function", () => {
  const goodS3Event = s3Event.goodS3Event;
  test("Take S3 json file and move to DDB", async () => {
    const result = (await ingest.handler(goodS3Event)) as {
      statusCode: number;
      body: string;
    };
    expect(result.statusCode).toBe(200);
    expect(result.body).toBe("Item/s In Table");
  });
  const badS3Event = s3Event.badS3Event;
  test("bad S3 trigger get 400", async () => {
    const result = (await ingest.handler(badS3Event)) as {
      statusCode: number;
      body: string;
    };
    expect(result.statusCode).toBe(400);
  });
  const goodS3badDDBEvent = s3Event.goodS3badDDBEvent;
  test("good S3 trigger but bad JSON file to DDB get 400", async () => {
    const result = (await ingest.handler(goodS3badDDBEvent)) as {
      statusCode: number;
      body: string;
    };
    expect(result.statusCode).toBe(400);
  });
});

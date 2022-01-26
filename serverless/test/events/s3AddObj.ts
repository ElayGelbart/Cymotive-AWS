export const goodS3Event = {
  Records: [
    {
      eventVersion: "2.1",
      eventSource: "aws:s3",
      awsRegion: "eu-west-1",
      eventTime: "2021-09-03T19:37:27.192Z",
      eventName: "ObjectCreated:Put",
      userIdentity: {
        principalId: "AWS:AIDAINPONIXQXHT3IKHL2",
      },
      requestParameters: {
        sourceIPAddress: "205.255.255.255",
      },
      responseElements: {
        "x-amz-request-id": "D82B88E5F771F645",
        "x-amz-id-2":
          "vlR7PnpV2Ce81l0PRw6jlUpck7Jo5ZsQjryTjKlc5aLWGVHPZLj5NeC6qMa0emYBDXOo6QBU0Wo=",
      },
      s3: {
        s3SchemaVersion: "1.0",
        configurationId: "828aa6fc-f7b5-4305-8584-487c791949c1",
        bucket: {
          name: "cymotive-reports-test",
          ownerIdentity: {
            principalId: "A3I5XTEXAMAI3E",
          },
          arn: "arn:aws:s3:::lambda-artifacts-deafc19498e3f2df",
        },
        object: {
          key: "test.json",
          size: 1305107,
          eTag: "b21b84d653bb07b05b1e6b33684dc11b",
          sequencer: "test.json",
        },
      },
    },
  ],
};
export const badS3Event = {
  Records: [
    {
      eventVersion: "2.1",
      eventSource: "aws:s3",
      awsRegion: "eu-west-1",
      eventTime: "2021-09-03T19:37:27.192Z",
      eventName: "ObjectCreated:Put",
      userIdentity: {
        principalId: "AWS:AIDAINPONIXQXHT3IKHL2",
      },
      requestParameters: {
        sourceIPAddress: "205.255.255.255",
      },
      responseElements: {
        "x-amz-request-id": "D82B88E5F771F645",
        "x-amz-id-2":
          "vlR7PnpV2Ce81l0PRw6jlUpck7Jo5ZsQjryTjKlc5aLWGVHPZLj5NeC6qMa0emYBDXOo6QBU0Wo=",
      },
      s3: {
        s3SchemaVersion: "1.0",
        configurationId: "828aa6fc-f7b5-4305-8584-487c791949c1",
        bucket: {
          name: "cymotive-reports-test",
          ownerIdentity: {
            principalId: "A3I5XTEXAMAI3E",
          },
          arn: "arn:aws:s3:::lambda-artifacts-deafc19498e3f2df",
        },
        object: {
          key: "testasas.json",
          size: 1305107,
          eTag: "b21b84d653bb07b05b1e6b33684dc11b",
          sequencer: "testasas.json",
        },
      },
    },
  ],
};
export const goodS3badDDBEvent = {
  Records: [
    {
      eventVersion: "2.1",
      eventSource: "aws:s3",
      awsRegion: "eu-west-1",
      eventTime: "2021-09-03T19:37:27.192Z",
      eventName: "ObjectCreated:Put",
      userIdentity: {
        principalId: "AWS:AIDAINPONIXQXHT3IKHL2",
      },
      requestParameters: {
        sourceIPAddress: "205.255.255.255",
      },
      responseElements: {
        "x-amz-request-id": "D82B88E5F771F645",
        "x-amz-id-2":
          "vlR7PnpV2Ce81l0PRw6jlUpck7Jo5ZsQjryTjKlc5aLWGVHPZLj5NeC6qMa0emYBDXOo6QBU0Wo=",
      },
      s3: {
        s3SchemaVersion: "1.0",
        configurationId: "828aa6fc-f7b5-4305-8584-487c791949c1",
        bucket: {
          name: "cymotive-reports-test",
          ownerIdentity: {
            principalId: "A3I5XTEXAMAI3E",
          },
          arn: "arn:aws:s3:::lambda-artifacts-deafc19498e3f2df",
        },
        object: {
          key: "testBad.json",
          size: 1305107,
          eTag: "b21b84d653bb07b05b1e6b33684dc11b",
          sequencer: "testBad.json",
        },
      },
    },
  ],
};

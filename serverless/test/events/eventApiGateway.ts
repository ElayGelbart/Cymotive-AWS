export const goodPostEvent = {
  resource: "/",
  path: "/",
  httpMethod: "POST",
  requestContext: {
    resourcePath: "/",
    httpMethod: "POST",
    path: "/",
  },
  multiValueHeaders: {
    accept: [
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    ],
    "accept-encoding": ["gzip, deflate, br"],
  },
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  pathParameters: null,
  stageVariables: null,
  body: JSON.stringify({
    vehicleId: "e252d236-a830-5438-88e3-420aff355d2b",
    label: "VW Polo",
    modifiedDate: "2075-04-29T03:58:11.803Z",
    manufacturerType: "VW",
    manufacturerTitle: "Polo",
    signalsPerMinute: {
      infotainment: {
        canId: 11,
        busId: 50,
        acceptableMinValue: 2,
        acceptableMaxValue: 17,
        sum: 12,
      },
      windows: {
        canId: 46,
        busId: 12,
        acceptableMinValue: 522,
        acceptableMaxValue: 578,
        sum: 580,
      },
      airBag: {
        canId: 80,
        busId: 6,
        acceptableMinValue: 3,
        acceptableMaxValue: 8,
        sum: 6,
      },
    },
  }),
  isBase64Encoded: false,
};
export const badPostEvent = {
  resource: "/",
  path: "/",
  httpMethod: "POST",
  requestContext: {
    resourcePath: "/",
    httpMethod: "POST",
    path: "/",
  },
  headers: {
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-encoding": "gzip, deflate, br",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
    "X-Amzn-Trace-Id": "Root=1-5e66d96f-7491f09xmpl79d18acf3d050",
  },
  multiValueHeaders: {
    accept: [
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    ],
    "accept-encoding": ["gzip, deflate, br"],
  },
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  pathParameters: null,
  stageVariables: null,
  body: null,
  isBase64Encoded: false,
};
export const goodGetNumOfVehiclesEvent = {
  resource: "/",
  path: "/numberofvehicles",
  httpMethod: "GET",
  requestContext: {
    resourcePath: "/",
    httpMethod: "GET",
    path: "/",
  },
  multiValueHeaders: {
    accept: [
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    ],
    "accept-encoding": ["gzip, deflate, br"],
  },
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  pathParameters: null,
  stageVariables: null,
  body: null,
  isBase64Encoded: false,
};
export const goodGetNumOfReportsEvent = {
  resource: "/",
  path: "/numberofreports",
  httpMethod: "GET",
  requestContext: {
    resourcePath: "/",
    httpMethod: "GET",
    path: "/",
  },
  multiValueHeaders: {
    accept: [
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    ],
    "accept-encoding": ["gzip, deflate, br"],
  },
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  pathParameters: null,
  stageVariables: null,
  body: null,
  isBase64Encoded: false,
};
export const goodGetNumOfAnomaliesEvent = {
  resource: "/",
  path: "/numberofanomalies",
  httpMethod: "GET",
  requestContext: {
    resourcePath: "/",
    httpMethod: "GET",
    path: "/",
  },
  multiValueHeaders: {
    accept: [
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    ],
    "accept-encoding": ["gzip, deflate, br"],
  },
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  pathParameters: null,
  stageVariables: null,
  body: null,
  isBase64Encoded: false,
};

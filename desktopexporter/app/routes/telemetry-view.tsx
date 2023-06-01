import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { Grid, GridItem, keyframes } from "@chakra-ui/react";

import {
  LogData,
  SpanData,
  TelemetryData,
  TraceData,
} from "../types/api-types";
import { LogDetailView } from "../components/detail-view/log-detail-view";
import { Header } from "../components/header-view/header";
import { TraceDetailView } from "../components/detail-view/trace-detail-view";

export async function telemetryLoader({ params }: any) {
  let response = await fetch(`/api/telemetry/${params.id}`);
  let telemetryData = await response.json();
  console.log("telemetry view what");

  return telemetryData;
}

export default function TelemetryView() {
  let telemetryData = useLoaderData() as TelemetryData;
  let [telemetryType, setTelemetryType] = useState(telemetryData.type);

  let logData = telemetryData.log as LogData;
  let traceData = telemetryData.trace as TraceData;
  let span = traceData.spans[0] as SpanData;

  useEffect(() => {
    setTelemetryType(() => telemetryData.type);
  }, [telemetryData]);

  return (
    <Grid
      templateAreas={`"header detail"
                       "main detail"`}
      gridTemplateColumns={"1fr 350px"}
      gridTemplateRows={"100px 1fr"}
      gap={"0"}
      height={"100vh"}
      width={"100vw"}
    >
      <GridItem area={"header"}>
        {/* <Header traceID={telemetryData.ID} /> */}
      </GridItem>
      <GridItem
        area={"main"}
        marginLeft="20px"
      >
        <div>{telemetryData.ID}</div>

        <div>{`${telemetryData.type}`}</div>
      </GridItem>
      <GridItem area={"detail"}>
        {/* <div>{`${telemetryData.type}`}</div> */}
        {telemetryType == "trace" && <TraceDetailView span={span} />}
        {telemetryType == "log" && <div>{`${logData.body}`}</div>}
      </GridItem>
    </Grid>
  );
}

// log data
// {
//   "body": "something with currency happened",
//   "traceID": "7979cec4d1c04222fa9a3c7c97c0a99c",
//   "spanID": "2c1ae93af4d3f887",
//   "timestamp": "2023-05-31T23:50:20.280867Z",
//   "observedTimestamp": "2023-05-31T23:50:20.280867Z",
//   "attributes": {
//       "bool-attr": true
//   },
//   "severityText": "ERROR",
//   "severityNumber": 17,
//   "droppedAttributeCount": 99,
//   "resource": {
//       "attributes": {
//           "service.name": "sample-currencyservice",
//           "telemetry.sdk.language": "cpp",
//           "telemetry.sdk.name": "opentelemetry",
//           "telemetry.sdk.version": "1.5.0"
//       },
//       "droppedAttributesCount": 0
//   },
//   "scope": {
//       "name": "sample-currencyservice",
//       "version": "v1.2.3",
//       "attributes": {},
//       "droppedAttributesCount": 0
//   }
// }

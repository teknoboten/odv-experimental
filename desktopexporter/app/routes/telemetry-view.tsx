import React from "react";
import { useLoaderData } from "react-router-dom";
import { Grid, GridItem, keyframes } from "@chakra-ui/react";

import { LogData, TelemetryData } from "../types/api-types";
import { LogDetailView } from "../components/detail-view/log-detail-view";
import { Header } from "../components/header-view/header";

export async function telemetryLoader({ params }: any) {
  let response = await fetch(`/api/telemetry/${params.id}`);
  let telemetryData = await response.json();
  return telemetryData;
}

export default function TelemetryView() {
  let telemetryData = useLoaderData() as TelemetryData;
  let logData = telemetryData.log as LogData;

  console.log("log data:", logData);

  //To Do: make this do stuff

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
        <Header traceID={telemetryData.ID} />
      </GridItem>
      <GridItem
        area={"main"}
        marginLeft="20px"
      ></GridItem>
      <GridItem area={"detail"}>
        {/* <DetailView span={selectedSpan} /> */}
        <LogDetailView log={logData} />
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

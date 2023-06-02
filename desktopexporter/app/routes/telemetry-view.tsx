import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { Grid, GridItem, keyframes } from "@chakra-ui/react";

import {
  LogData,
  SpanData,
  TelemetryData,
  TraceData,
} from "../types/api-types";
import { Header } from "../components/header-view/header";

export async function telemetryLoader({ params }: any) {
  let response = await fetch(`/api/telemetry/${params.id}`);
  let telemetryData = await response.json();
  return telemetryData;
}

export default function TelemetryView() {
  let telemetryData = useLoaderData() as TelemetryData;
  let [telemetryType, setTelemetryType] = useState(telemetryData.type);

  let logData = telemetryData.log as LogData;

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
      <GridItem area={"header"}></GridItem>
      <GridItem
        area={"main"}
        marginLeft="20px"
      >
        <div>{telemetryData.ID}</div>

        <div>{`${telemetryData.type}`}</div>
      </GridItem>
      <GridItem area={"detail"}>
        {telemetryType == "log" && <div>{`${logData.body}`}</div>}
      </GridItem>
    </Grid>
  );
}

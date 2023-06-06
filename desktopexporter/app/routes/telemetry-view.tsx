import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { Grid, GridItem, keyframes } from "@chakra-ui/react";

//To Do: re-implement keyboard stuff!

import { LogData, TelemetryData, MetricData } from "../types/api-types";
import { Header } from "../components/header-view/header";
import { LogWaterfallView } from "../components/log-view/log-waterfall-view";
import { LogDetailView } from "../components/log-view/log-detail-view";
import { MetricWaterfallView } from "../components/metric-view/metric-waterfall-view";
import { MetricDetailView } from "../components/metric-view/metric-detail-view";

export async function telemetryLoader({ params }: any) {
  let response = await fetch(`/api/telemetry/${params.id}`);
  let telemetryData = await response.json();
  return telemetryData;
}

export default function TelemetryView() {
  let telemetryData = useLoaderData() as TelemetryData;
  let [telemetryType, setTelemetryType] = useState(telemetryData.type);
  let logData = telemetryData.log as LogData;
  let metricData = telemetryData.metric as MetricData;

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
        <Header telemetryID={telemetryData.ID} />
      </GridItem>
      <GridItem
        area={"main"}
        marginLeft="20px"
      >
        {telemetryType == "log" && <LogWaterfallView log={logData} />}
        {telemetryType == "metric" && (
          <MetricWaterfallView metric={metricData} />
        )}
      </GridItem>
      <GridItem area={"detail"}>
        {telemetryType == "log" && <LogDetailView log={logData} />}
        {telemetryType == "metric" && <MetricDetailView metric={metricData} />}
      </GridItem>
    </Grid>
  );
}

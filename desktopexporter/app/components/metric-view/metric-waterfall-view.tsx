import React, { useRef } from "react";
import { Flex } from "@chakra-ui/react";
import { LogHeaderRow } from "../log-view/log-header-row";
import { MetricData, ResourceData } from "../../types/api-types";

type MetricWaterfallViewProps = {
  metric: MetricData;
};

export function MetricWaterfallView(props: MetricWaterfallViewProps) {
  let containerRef = useRef(null); //not sure i need this?
  let resource = { ...props.metric.resource } as ResourceData;
  let { name, description, unit } = props.metric;
  let attributes = { ...resource.attributes };

  //display data
  const headerRowHeight = 30;
  const nameColumnWidth = 300;
  const serviceNameColumnWidth = 200;

  return (
    <Flex
      direction="column"
      ref={containerRef}
      height="100%"
      //   onCopy={stripZeroWidthSpacesOnCopyCallback} <- TO DO
    >
      <LogHeaderRow
        headerRowHeight={headerRowHeight}
        nameColumnWidth={nameColumnWidth}
        serviceNameColumnWidth={serviceNameColumnWidth}
      />
      <div>Service Name: {attributes[`service.name`]}</div>
      <div>Name: {name}</div>
      <div>Description: {description}</div>
      <div>Unit: {unit}</div>
    </Flex>
  );
}

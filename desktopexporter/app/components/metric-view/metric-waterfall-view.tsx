import React, { useRef } from "react";
import { Flex } from "@chakra-ui/react";
import { MetricData, ResourceData } from "../../types/api-types";

type MetricWaterfallViewProps = {
  metric: MetricData;
};

export function MetricWaterfallView(props: MetricWaterfallViewProps) {
  let resource = { ...props.metric.resource } as ResourceData;
  let { name, description, unit } = props.metric;
  let attributes = { ...resource.attributes };

  return (
    <Flex
      direction="column"
      height="100%"
      //   onCopy={stripZeroWidthSpacesOnCopyCallback} <- TO DO
    >
      <div>Service Name: {attributes[`service.name`]}</div>
      <div>Name: {name}</div>
      <div>Description: {description}</div>
      <div>Unit: {unit}</div>
    </Flex>
  );
}

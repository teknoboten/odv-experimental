import React, { useRef, createRef } from "react";
import { Flex } from "@chakra-ui/react";
import { LogHeaderRow } from "./log-header-row";
import { LogData, ResourceData } from "../../types/api-types";

type LogWaterfallViewProps = {
  log: LogData;
};

export function LogWaterfallView(props: LogWaterfallViewProps) {
  let containerRef = useRef(null);
  let resource = { ...props.log.resource } as ResourceData;
  let attributes = { ...resource.attributes };

  let {
    body,
    severityText,
    severityNumber,
    droppedAttributeCount,
    timestamp,
    observedTimestamp,
  } = props.log;

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
      <div>Body: {body}</div>
      <div>Severity Number: {severityNumber}</div>
      <div>Severity Text: {severityText}</div>
      <div>DroppedAttributeCount: {severityText}</div>
      <div>Timestamp {timestamp}</div>
      <div>Observed Timestamp{observedTimestamp}</div>
    </Flex>
  );
}

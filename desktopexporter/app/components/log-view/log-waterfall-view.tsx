import React, { useRef, createRef } from "react";
import { useLoaderData } from "react-router-dom";
// import { FixedSizeList } from "react-window";
import { Flex } from "@chakra-ui/react";
import { useSize } from "@chakra-ui/react-use-size";

import { LogHeaderRow } from "./log-header-row";
import { LogWaterfallRow } from "./log-waterfall-row";

import { LogData, ScopeData } from "../../types/api-types";
import Timestamp from "timestamp-nano";

type LogWaterfallViewProps = {
  log: LogData;
};

export function LogWaterfallView(props: LogWaterfallViewProps) {
  let containerRef = useRef(null);
  const size = useSize(containerRef);

  let {
    body,
    severityText,
    severityNumber,
    droppedAttributeCount,
    timestamp,
    observedTimestamp,
  } = props.log;

  //display data
  const waterfallItemHeight = 50;
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
      <div>log body {body}</div>
      <div>log severity numnber: {severityNumber}</div>
      <div>log severity text: {severityText}</div>
      <div>log droppedAttributeCount: {severityText}</div>
      <div>log timestamp {timestamp}</div>
      <div>log observed timestamp{observedTimestamp}</div>
      <div></div>
    </Flex>
  );
}

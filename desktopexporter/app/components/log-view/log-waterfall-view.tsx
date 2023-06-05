import React, { useRef } from "react";
import { FixedSizeList } from "react-window";
import { Flex } from "@chakra-ui/react";
import { useSize } from "@chakra-ui/react-use-size";

import { LogHeaderRow } from "./log-header-row";

import { LogData } from "../../types/api-types";

type LogWaterfallViewProps = {
  log: LogData;
};

function LogRow() {
  return (
    <div>
      <p>log stuff gonna log</p>
    </div>
  );
}

export function LogWaterfallView(props: LogWaterfallViewProps) {
  let containerRef = useRef(null);
  const size = useSize(containerRef);
  let { log } = props;

  const waterfallItemHeight = 50;
  const headerRowHeight = 30;
  const spanNameColumnWidth = 300;
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
        spanNameColumnWidth={spanNameColumnWidth}
        serviceNameColumnWidth={serviceNameColumnWidth}
      />
      {/* <FixedSizeList
        className="List"
        height={size ? size.height - headerRowHeight : 0}
        itemData={rowData}
        itemCount={orderedSpans.length}
        itemSize={waterfallItemHeight}
        ref={spanListRef}
        width={"100%"}
      >
        {LogRow}
      </FixedSizeList> */}
    </Flex>
  );
}

import React from "react";
import { Text, Flex, Spacer, useColorModeValue } from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";

import { LogData } from "../../types/api-types";
import { SpanDataStatus, SpanWithUIData } from "../../types/ui-types";

type LogWaterfallRowData = {
  log: LogData;

};

type LogWaterfallRowProps = {
  index: number;
  style: React.CSSProperties;
  data: LogWaterfallRowData;
};

export function LogWaterfallRow({ index, style, data }: LogWaterfallRowProps) {
  let selectedColour = useColorModeValue("pink.100", "pink.900");
  let oddStripeColour = useColorModeValue("gray.50", "gray.700");
  // Set the background colour to make the list striped.
  let backgroundColour = index % 2 ? "" : oddStripeColour;

  let paddingLeft = depth * 25;

    return (
      <Flex
        style={style}
        bgColor={backgroundColour}
        paddingLeft={`${paddingLeft}px`}
        // onClick={() => setSelectedSpanID(spanID)}
      >
        <Flex
          width={nameColumnWidth - paddingLeft}
          alignItems="center"
          flexGrow="1"
          flexShrink="0"
        >
          <Text
            paddingX={2}
            noOfLines={2}
            fontSize="sm"
          >
            {nameLabel}
          </Text>
        </Flex>
        <Flex
          width={serviceNameColumnWidth}
          alignItems="center"
          flexGrow="1"
          flexShrink="0"
        >
          <Text
            paddingX={2}
            fontSize="sm"
          >
            {resourceLabel}
          </Text>
        </Flex>
        <DurationBar
          spanData={spanData}
          traceTimeAttributes={traceTimeAttributes}
          spanStartTimestamp={spanData.startTime}
          spanEndTimestamp={spanData.endTime}
        />
      </Flex>
    );
  }
  return (
    <Flex
      style={style}
      alignItems="center"
      bgColor={backgroundColour}
      paddingStart={2}
      experimental_spaceX={2}
    >
      <WarningTwoIcon color="orange.500" />
      <Text fontSize="sm">{`Missing Span [Span ID:${spanID}]`}</Text>
    </Flex>
  );
}

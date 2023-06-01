import React, { useState, useEffect } from "react";
import { Flex, useColorModeValue, Button, Text } from "@chakra-ui/react";

import { TelemetryList } from "./telemetry-list";
import { TraceList } from "./trace-list";
import { SummaryWithUIData } from "../../types/ui-types";
import { SidebarHeader } from "./sidebar-header";
import { TraceSummaries } from "../../types/api-types";

const sidebarFullWidth = 350;
const sidebarCollapsedWidth = 70;

type SidebarProps = {
  isFullWidth: boolean;
  toggleSidebarWidth: () => void;
  summaries: SummaryWithUIData[];
  numNewTraces: number;
};

export function Sidebar(props: SidebarProps) {
  let sidebarColour = useColorModeValue("gray.50", "gray.700");
  let { isFullWidth, toggleSidebarWidth, summaries, numNewTraces } = props;
  let isFullWidthDisabled = summaries.length === 0;
  let [viewMode, setViewMode] = useState("traces");
  let traceSummaries = summaries.filter((trace) => trace.type === "trace");
  let logs = (summaries = summaries.filter(
    (telemetry) => telemetry.type === "log",
  ));

  //To Do: fix this filter
  useEffect(() => {
    console.log("mode is:", viewMode);

    // if (viewMode === "logs") {
    //   summaries = summaries.filter((telemetry) => telemetry.type === "log");
    // }
  }, [viewMode]);

  //To Do: refactor buttons into separate component

  if (isFullWidth) {
    return (
      <Flex
        backgroundColor={sidebarColour}
        flexShrink="0"
        direction="column"
        transition="width 0.2s ease-in-out"
        width={sidebarFullWidth}
      >
        <SidebarHeader
          isFullWidth={isFullWidth}
          toggleSidebarWidth={toggleSidebarWidth}
          isFullWidthDisabled={false}
          numNewTraces={numNewTraces}
        />
        <Button
          size="md"
          aria-label="View Traces"
          variant="ghost"
          colorScheme="pink"
          fontWeight="normal"
          marginStart="10px"
          onClick={() => setViewMode("traces")}
        >
          <Text
            fontSize="sm"
            fontWeight="bold"
            color="ButtonText"
          >
            View Traces
          </Text>
        </Button>
        <Button
          size="md"
          aria-label="View Logs"
          variant="ghost"
          colorScheme="pink"
          fontWeight="normal"
          marginStart="10px"
          onClick={() => setViewMode("logs")}
        >
          <Text
            fontSize="sm"
            fontWeight="bold"
            color="ButtonText"
          >
            Logs
          </Text>
        </Button>
        <Button
          size="md"
          aria-label="View Metrics"
          variant="ghost"
          colorScheme="pink"
          fontWeight="normal"
          marginStart="10px"
          onClick={() => setViewMode("metrics")}
        >
          <Text
            fontSize="sm"
            fontWeight="bold"
            color="ButtonText"
          >
            Metrics
          </Text>
        </Button>

        {viewMode == "traces" && <TraceList summaries={traceSummaries} />}
        {viewMode == "logs" && <TelemetryList summaries={logs} />}
        {/* {viewMode == "logs" && <div>log list goes here</div>} */}
        {viewMode == "metrics" && <div>metric list goes here</div>}
      </Flex>
    );
  }

  return (
    <Flex
      alignItems="center"
      backgroundColor={sidebarColour}
      flexShrink="0"
      direction="column"
      transition="width 0.2s ease-in-out"
      width={sidebarCollapsedWidth}
    >
      <SidebarHeader
        isFullWidth={isFullWidth}
        isFullWidthDisabled={isFullWidthDisabled}
        toggleSidebarWidth={toggleSidebarWidth}
        numNewTraces={0}
      />
    </Flex>
  );
}

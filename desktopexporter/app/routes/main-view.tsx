import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Flex, useBoolean } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

import { Sidebar } from "../components/sidebar-view/sidebar";
import { EmptyStateView } from "../components/empty-state-view/empty-state-view";
import { Summaries, Summary } from "../types/api-types";
import { SidebarData, SummaryWithUIData } from "../types/ui-types";
import { getDurationNs, getDurationString } from "../utils/duration";

export async function mainLoader() {
  const response = await fetch("/api/telemetry");
  let summaries = await response.json();

  return summaries;
}

export default function MainView() {
  let { summaries } = useLoaderData() as Summaries;
  let [isFullWidth, setFullWidth] = useBoolean(summaries.length > 0);

  // initialize the sidebar summaries at mount time
  let [sidebarData, setSidebarData] = useState(initSidebarData(summaries));

  // check every second to see if we have new data
  // and upsate sidebar summaries accordingly
  // useEffect(() => {
  //   async function checkForNewData() {
  //     let response = await fetch("/api/telemetry");
  //     if (response.ok) {
  //       let { summaries } = (await response.json()) as Summaries;
  //       let newSidebarData = updateSidebarData(sidebarData, summaries);
  //       setSidebarData(newSidebarData);
  //     }
  //   }

  //   let interval = setInterval(checkForNewData, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  // Handle empty state
  if (!summaries.length) {
    return (
      <Flex height="100vh">
        <Sidebar
          isFullWidth={isFullWidth}
          toggleSidebarWidth={setFullWidth.toggle}
          summaries={[]}
          numNewTraces={0}
        />
        <EmptyStateView />
      </Flex>
    );
  }

  return (
    <Flex height="100vh">
      <Sidebar
        isFullWidth={isFullWidth}
        toggleSidebarWidth={setFullWidth.toggle}
        summaries={sidebarData.summaries}
        numNewTraces={sidebarData.numNewTelemetry}
      />
      <Outlet />
    </Flex>
  );
}

function initSidebarData(summaries: Summary[]): SidebarData {
  summaries = summaries.filter((summary) => filterMetrics(summary)); //filter metrics for now

  return {
    summaries: summaries.map((summary) => generateSummaryWithUIData(summary)),
    numNewTelemetry: 0,
  };
}

function updateSidebarData(
  sidebarData: SidebarData,
  summaries: Summary[],
): SidebarData {
  let mergedData: SidebarData = {
    numNewTelemetry: 0,
    summaries: [...sidebarData.summaries],
  };

  // Check for new and stale traces
  for (let summary of summaries) {
    let ID = summary.ID;
    let sidebarSummaryIndex = mergedData.summaries.findIndex(
      (s) => s.ID === ID,
    );

    if (sidebarSummaryIndex === -1) {
      // If the traceID of the new summary has no match in the sidebar
      // increment the number of new traces.
      mergedData.numNewTelemetry++;
    } else if (
      summary.spanCount > mergedData.summaries[sidebarSummaryIndex].spanCount
    ) {
      // If the number of spans in an existing trace is greater than what's displayed in the sidebar
      // generate a whole new summary with ui data
      mergedData.summaries[sidebarSummaryIndex] =
        generateSummaryWithUIData(summary);
    }
  }

  // Check for deleted/expired traces
  for (let [i, summary] of mergedData.summaries.entries()) {
    let traceID = summary.ID;
    let counterpartIndex = summaries.findIndex((s) => s.ID === traceID);
    if (counterpartIndex === -1) {
      // If a summary present in the sidebar is not present in the list of incoming traces
      // it is expired and must be removed
      mergedData.summaries.splice(i, 1);
    }
  }
  return mergedData;
}

function generateSummaryWithUIData(summary: Summary): SummaryWithUIData {
  if (summary.hasRootSpan) {
    let duration = getDurationNs(summary.rootStartTime, summary.rootEndTime);
    let durationString = getDurationString(duration);

    return {
      hasRootSpan: true,
      serviceName: summary.rootServiceName,
      rootName: summary.rootName,
      rootDurationString: durationString,
      spanCount: summary.spanCount,
      ID: summary.ID,
      type: summary.type,
      traceID: summary.traceID,
    };
  }

  if (summary.type == "trace" && !summary.hasRootSpan) {
    return {
      hasRootSpan: false,
      spanCount: summary.spanCount,
      ID: summary.ID,
      type: summary.type,
      serviceName: summary.serviceName,
      traceID: summary.traceID,
    };
  }
  return {
    spanCount: 0,
    ID: summary.ID,
    type: summary.type,
    serviceName: summary.serviceName,
    traceID: summary.traceID,
  };
}

function filterMetrics(summary: Summary) {
  return summary.type !== "metric";
}

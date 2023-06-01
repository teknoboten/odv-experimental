import React, { useEffect, useRef } from "react";
import { FixedSizeList } from "react-window";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Flex,
  LinkBox,
  LinkOverlay,
  Divider,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useSize } from "@chakra-ui/react-use-size";

import {
  SummaryWithUIData,
  TraceSummaryWithUIData,
} from "../../types/ui-types";
import { useKeyCombo, useKeyPress } from "../../utils/use-key-press";
import { KeyboardHelp } from "../modals/keyboard-help";

const sidebarSummaryHeight = 120;
const dividerHeight = 1;

//To Do: presto chango summaries into trace summaries ??

type SidebarRowData = {
  selectedID: string;
  summaries: SummaryWithUIData[];
};

type SidebarRowProps = {
  index: number;
  style: Object;
  data: SidebarRowData;
};

function SidebarRow({ index, style, data }: SidebarRowProps) {
  let selectedColor = useColorModeValue("pink.100", "pink.900");
  let dividerColour = useColorModeValue("blackAlpha.300", "whiteAlpha.300");
  let { selectedID, summaries } = data;
  let summary = summaries[index];

  let isSelected = selectedID && selectedID === summary.ID ? true : false;

  let backgroundColour = isSelected ? selectedColor : "";

  if (summary.hasRootSpan) {
    // Add zero-width space after forward slashes, dashes, and dots
    // to indicate line breaking opportunity
    let rootNameLabel = summary.rootName
      .replaceAll("/", "/\u200B")
      .replaceAll("-", "-\u200B")
      .replaceAll(".", ".\u200B");

    let rootServiceNameLabel = summary.rootServiceName
      .replaceAll("/", "/\u200B")
      .replaceAll("-", "-\u200B")
      .replaceAll(".", ".\u200B");

    return (
      <div style={style}>
        <Divider
          height={dividerHeight}
          borderColor={dividerColour}
        />
        <LinkBox
          display="flex"
          flexDirection="column"
          justifyContent="center"
          bgColor={backgroundColour}
          height={`${sidebarSummaryHeight}px`}
          paddingX="20px"
        >
          <Text
            fontSize="xs"
            noOfLines={1}
          >
            {"Root Service Name: "}
            <strong>{rootServiceNameLabel}</strong>
          </Text>
          <Text
            fontSize="xs"
            noOfLines={2}
          >
            {"Root Name: "}
            <strong>{rootNameLabel}</strong>
          </Text>
          <Text fontSize="xs">
            {"Root Duration: "}
            <strong>{summary.rootDurationString}</strong>
          </Text>
          <Text fontSize="xs">
            {"Number of Spans: "}
            <strong>{summary.spanCount}</strong>
          </Text>
          <LinkOverlay
            as={NavLink}
            to={`traces/${summary.ID}`}
          >
            <Text fontSize="xs">
              {"Trace ID: "}
              <strong>{summary.ID}</strong>
            </Text>
          </LinkOverlay>
        </LinkBox>
      </div>
    );
  }

  return (
    <div style={style}>
      <Divider
        height={dividerHeight}
        borderColor={dividerColour}
      />
      <LinkBox
        display="flex"
        flexDirection="column"
        justifyContent="center"
        bgColor={backgroundColour}
        height={`${sidebarSummaryHeight}px`}
        paddingX="20px"
      >
        <Text fontSize="xs">
          <strong>Service Name</strong>
        </Text>
        <Text fontSize="xs">{`Type: ${summary.type}`}</Text>

        {/* <Text fontSize="xs">
          {"Incomplete Trace: "}
          <strong>{"missing a root span"}</strong>
        </Text>
        <Text fontSize="xs">
          {"Number of Spans: "}
          <strong>{summary.spanCount}</strong>
        </Text> */}

        <LinkOverlay
          as={NavLink}
          to={`traces/${summary.ID}`}
        >
          <Text fontSize="xs">
            {"Trace ID: "}
            <strong>{summary.ID}</strong>
          </Text>
        </LinkOverlay>
      </LinkBox>
    </div>
  );
}

//To Do: ??

type TraceListProps = {
  // traceSummaries: TraceSummaryWithUIData[];
  summaries: SummaryWithUIData[];
};

export function TraceList(props: TraceListProps) {
  let containerRef = useRef(null);
  let summaryListRef = React.createRef<FixedSizeList>();
  let size = useSize(containerRef);

  let location = useLocation();
  let navigate = useNavigate();

  let { isOpen, onOpen, onClose } = useDisclosure();

  let selectedIndex = 0;
  let selectedID = "";
  let { summaries } = props;

  // Default to the first trace in the list if none are selected
  if (location.pathname.includes("/traces/")) {
    selectedID = location.pathname.split("/")[2];
    selectedIndex = summaries.findIndex((summary) => summary.ID === selectedID);
  } else {
    // selectedID = summaries[selectedIndex].ID;
    let selectedID = "7979cec4d1c04222fa9a3c7c97c0a99c";
    window.location.href = `/traces/${selectedID}`;
  }

  // Scroll to the currently selected trace summary on load
  useEffect(() => {
    summaryListRef.current?.scrollToItem(selectedIndex, "start");
  }, []);

  // Set up keyboard navigation
  let prevTraceKeyPressed = useKeyPress(["ArrowLeft", "h"]);
  let nextTraceKeyPressed = useKeyPress(["ArrowRight", "l"]);
  let reloadKeyPressed = useKeyPress(["r"]);
  let navHelpComboPressed = useKeyCombo(["Shift"], ["?"]);
  let clearTracesComboPressed = useKeyCombo(["Control"], ["l"]);

  // Navigate to previous trace
  useEffect(() => {
    if (prevTraceKeyPressed) {
      selectedIndex = selectedIndex > 0 ? selectedIndex - 1 : 0;
      summaryListRef.current?.scrollToItem(selectedIndex);

      selectedID = summaries[selectedIndex].ID;
      navigate(`/traces/${selectedID}`);
    }
  }, [prevTraceKeyPressed]);

  // Navigate to next trace
  useEffect(() => {
    if (nextTraceKeyPressed) {
      selectedIndex =
        selectedIndex < summaries.length - 1
          ? selectedIndex + 1
          : summaries.length - 1;
      summaryListRef.current?.scrollToItem(selectedIndex);

      selectedID = summaries[selectedIndex].ID;
      navigate(`/traces/${selectedID}`);
    }
  }, [nextTraceKeyPressed]);

  // Reload current window
  useEffect(() => {
    if (reloadKeyPressed) {
      window.location.reload();
    }
  }, [reloadKeyPressed]);

  // Show the keyboard navigation help modal
  useEffect(() => {
    if (navHelpComboPressed) {
      onOpen();
    }
  }, [navHelpComboPressed]);

  // Clear current traces
  useEffect(() => {
    if (clearTracesComboPressed) {
      clearTraceData();
    }
  }, [clearTracesComboPressed]);

  let itemData = {
    selectedID: selectedID,
    summaries: summaries,
  };

  let itemHeight = sidebarSummaryHeight + dividerHeight;

  return (
    <Flex
      ref={containerRef}
      height="100%"
    >
      <FixedSizeList
        height={size ? size.height : 0}
        itemData={itemData}
        itemCount={props.summaries.length}
        itemSize={itemHeight}
        width="100%"
        ref={summaryListRef}
      >
        {SidebarRow}
      </FixedSizeList>
      <KeyboardHelp
        isOpen={isOpen}
        onClose={onClose}
      />
    </Flex>
  );
}

export async function clearTraceData() {
  let response = await fetch("/api/clearData");
  if (!response.ok) {
    throw new Error("HTTP status " + response.status);
  } else {
    window.location.replace("/");
  }
}

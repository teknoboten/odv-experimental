import React, { useRef } from "react";
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

import { SummaryWithUIData } from "../../types/ui-types";
import { useKeyCombo, useKeyPress } from "../../utils/use-key-press";
import { KeyboardHelp } from "../modals/keyboard-help";

const sidebarSummaryHeight = 120;
const dividerHeight = 1;

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
  let isTrace = summary.type == "trace" ? true : false;

  let backgroundColour = isSelected ? selectedColor : "";

  return isTrace ? (
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

        <Text fontSize="xs">
          {"Incomplete Trace: "}
          <strong>{"missing a root span"}</strong>
        </Text>
        <Text fontSize="xs">
          {"Number of Spans: "}
          <strong>{summary.spanCount}</strong>
        </Text>

        <LinkOverlay
          as={NavLink}
          to={`${isTrace ? "traces" : "telemetry"}/${summary.ID}`}
        >
          <Text fontSize="xs">
            {"Telemetry ID: "}
            <strong>{summary.ID}</strong>
          </Text>
        </LinkOverlay>
      </LinkBox>
    </div>
  ) : (
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
        <LinkOverlay
          as={NavLink}
          to={`${isTrace ? "traces" : "telemetry"}/${summary.ID}`}
        >
          <Text fontSize="xs">
            {"Telemetry ID: "}
            <strong>{summary.ID}</strong>
          </Text>
        </LinkOverlay>
      </LinkBox>
    </div>
  );
}

//To Do: ??

type TelemetryListProps = {
  summaries: SummaryWithUIData[];
};

export function TelemetryList(props: TelemetryListProps) {
  let containerRef = useRef(null);
  let summaryListRef = React.createRef<FixedSizeList>();
  let size = useSize(containerRef);
  let location = useLocation();
  // let navigate = useNavigate();
  // let { isOpen, onOpen, onClose } = useDisclosure();

  console.log("location telemetrylist", location);

  let { summaries } = props;

  let [selectedID, setSelectedID] = React.useState<string>(summaries[0].ID);

  // let selectedIndex = 0;
  // let selectedID = "";

  //To Do: fix this!

  // Default to the first trace in the list if none are selected
  // if (location.pathname.includes("/telemetry/")) {
  //   selectedID = location.pathname.split("/")[2];
  //   selectedIndex = summaries.findIndex((summary) => summary.ID === selectedID);
  // } else {
  //   // selectedID = summaries[selectedIndex].ID;
  //   let selectedID =
  //     "315a598108ec1e0ecd6ee445fb31b445746e86c5f67c0fd9e4ea10e02d014e09";
  //   // window.location.href = `/api/telemetry/${selectedID}`;
  // }

  let itemData = {
    selectedID: selectedID,
    summaries: summaries,
  };

  let itemHeight = sidebarSummaryHeight + dividerHeight;

  React.useEffect(() => {
    setSelectedID(location.pathname.split("/")[2]);
  }, [location]);

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
      {/* <KeyboardHelp
        isOpen={isOpen}
        onClose={onClose}
      /> */}
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

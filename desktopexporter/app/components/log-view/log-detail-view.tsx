import React from "react";
import { LogData } from "../../types/api-types";
import { Flex, Tab, TabList, TabPanels, Tabs, Text } from "@chakra-ui/react";

type LogDetailViewProps = {
  log: LogData | undefined;
};

export function LogDetailView(props: LogDetailViewProps) {
  let { log } = props;
  if (!log) {
    return <div></div>;
  }

  return (
    <Flex
      grow="0"
      shrink="1"
      basis="350px"
      height="100vh"
      paddingTop="30px"
      overflowY="scroll"
    >
      <Tabs
        colorScheme="pink"
        margin={3}
        size="sm"
        variant="soft-rounded"
        width="100vw"
      >
        <TabList>
          <Tab>Beautiful Log Data 💁‍♀️</Tab>
          {/* <Tab isDisabled={numEvents === 0}>Events({numEvents})</Tab>
          <Tab isDisabled={numLinks === 0}>Links({numLinks})</Tab> */}
        </TabList>
        <TabPanels>
          {/* <FieldsPanel span={span} />
          <EventsPanel
            events={span.events}
            spanStartTime={span.startTime}
          />
          <LinksPanel links={span.links} /> */}
          <Text>{log.body}</Text>
          <Text>resource data goes here</Text>
          <Text>scope data goes here</Text>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

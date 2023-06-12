import React from "react";
import { LogData } from "../../types/api-types";
import { Flex } from "@chakra-ui/react";

import { LogDataPanel } from "./log-data-panel";

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
      <LogDataPanel log={log} />
    </Flex>
  );
}

// <Tabs
// colorScheme="pink"
// margin={3}
// size="sm"
// variant="soft-rounded"
// width="100vw"
// >
// <TabPanels>
//  <FieldsPanel span={span} />
//   <EventsPanel
//     events={span.events}
//     spanStartTime={span.startTime}
//   />
//   <LinksPanel links={span.links} />

//   <Text>{log.body}</Text>
//   <Text>resource data goes here</Text>
//   <Text>scope data goes here</Text>
// </TabPanels>
// </Tabs>

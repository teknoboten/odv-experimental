import React from "react";
import { MetricData, ResourceData } from "../../types/api-types";
import { Flex, Tab, TabList, TabPanels, Tabs } from "@chakra-ui/react";

type MetricDetailViewProps = {
  metric: MetricData;
};

export function MetricDetailView(props: MetricDetailViewProps) {
  let { name, description, unit } = props.metric;
  let resource = { ...props.metric.resource } as ResourceData;
  let attributes = { ...resource.attributes };

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
          <Tab>Beautiful Metric Data 💁‍♀️</Tab>
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
          <div>Service Name: {attributes[`service.name`]}</div>
          <div>{name}</div>
          <div>{description}</div>
          <div>{unit}</div>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

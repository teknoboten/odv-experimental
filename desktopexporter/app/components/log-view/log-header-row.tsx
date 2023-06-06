import React, { useRef } from "react";
import { useSize } from "@chakra-ui/react-use-size";
import { Flex, Heading, List, ListItem, Spacer, Text } from "@chakra-ui/react";

type LogHeaderRowProps = {
  headerRowHeight: number;
  nameColumnWidth: number;
  serviceNameColumnWidth: number;
};

export function LogHeaderRow(props: LogHeaderRowProps) {
  let { headerRowHeight, nameColumnWidth, serviceNameColumnWidth } = props;

  return (
    <Flex height={`${headerRowHeight}px`}>
      <Flex
        width={nameColumnWidth}
        alignItems="center"
      >
        <Heading
          paddingX={2}
          size="sm"
        >
          name
        </Heading>
      </Flex>
      <Flex
        width={serviceNameColumnWidth}
        alignItems="center"
      >
        <Heading
          paddingX={1}
          size="sm"
        >
          service.name
        </Heading>
      </Flex>
    </Flex>
  );
}

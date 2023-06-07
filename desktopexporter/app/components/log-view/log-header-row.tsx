import React, { useRef } from "react";
import { useSize } from "@chakra-ui/react-use-size";
import { Flex, Heading, List, ListItem, Spacer, Text } from "@chakra-ui/react";

export function LogHeaderRow() {
  return (
    <Flex height={30}>
      <Flex
        width={300}
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
        width={300}
        alignItems="center"
      >
        <Heading
          paddingX={1}
          size="sm"
        >
          body
        </Heading>
      </Flex>
      <Flex
        width={100}
        alignItems="center"
      >
        <Heading
          paddingX={1}
          size="sm"
        >
          severity
        </Heading>
      </Flex>

      <Flex
        width={300}
        alignItems="center"
      >
        <Heading
          paddingX={1}
          size="sm"
        >
          timestamp
        </Heading>
      </Flex>
    </Flex>
  );
}

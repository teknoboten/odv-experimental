import React from "react";
import { Flex, Text } from "@chakra-ui/react";

type HeaderProps = {
  telemetryID: string;
};

export function Header(props: HeaderProps) {
  return (
    <Flex
      align="center"
      height="100px"
      paddingX="24px"
    >
      <Text
        fontSize="lg"
        noOfLines={1}
      >
        {"Telemetry ID: "}
        <strong>{props.telemetryID}</strong>
      </Text>
    </Flex>
  );
}

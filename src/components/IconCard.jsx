import React from "react";
import { WrapItem, Circle, Icon, Heading, Stack } from "@chakra-ui/react";

const IconCard = ({ icon, heading }) => {
  return (
    <WrapItem w="sm" bg="blue.50" py={20} borderRadius="xl">
      <Stack alignItems="center" w="full" gap={4}>
        <Circle size="24" bg="blue.500" color="white">
          <Icon as={icon} boxSize="2em" />
        </Circle>
        <Heading as="h3" size="lg">
          {heading}
        </Heading>
      </Stack>
    </WrapItem>
  );
};

export default IconCard;

import React, { useState } from "react";
import {
  Box,
  Divider,
  Text,
  Badge,
  Stack,
  Link,
  Button,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";

import Card from "./Card";
import Modal from "./Modal";
import { updateRequestActive } from "../wallet";

const TransferCard = ({
  bobo,
  key,
  pcp,
  pcpSpecialty,
  pcpAddress,
  pcpEmail,
  requester,
  requesterAddress,
  requesterSpecialty,
  requesterEmail,
  time,
  buttonTF,
}) => {
  const [modalInfo, setModalInfo] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    updateRequestActive(bobo);
    setIsLoading(true);
  };

  return (
    <>
      <Box maxW="md">
        <Card>
          <Stack gap={3}>
            <Box>
              {buttonTF ? (
                <Badge colorScheme="blue">Pending</Badge>
              ) : (
                <Badge colorScheme="green">Completed</Badge>
              )}
            </Box>
            <Text>
              <Link
                color="blue.500"
                onClick={() => {
                  setModalInfo({
                    requester,
                    requesterAddress,
                    requesterSpecialty,
                    requesterEmail,
                  });
                  onOpen();
                }}
              >
                {requester}
              </Link>{" "}
              {buttonTF
                ? "requested your record from "
                : "has receieved your record from "}
              <Link
                color="blue.500"
                onClick={() => {
                  setModalInfo({
                    pcp,
                    pcpSpecialty,
                    pcpAddress,
                    pcpEmail,
                  });
                  onOpen();
                }}
              >
                {pcp}
              </Link>
            </Text>
            <Divider />
            <Box>
              <HStack justifyContent="space-between">
                <Text color="gray.500">{time}</Text>
                <Button
                  onClick={handleClick}
                  isDisabled={isLoading}
                  isLoading={isLoading}
                  colorScheme="green"
                  display={buttonTF ? "flex" : "none"}
                >
                  Accept
                </Button>
              </HStack>
            </Box>
          </Stack>
        </Card>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} info={modalInfo} />
    </>
  );
};

export default TransferCard;

import React from "react";
import {
  Modal as UIModal,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalContent,
  Badge,
  Text,
  Box,
  Link,
} from "@chakra-ui/react";

const Modal = ({ isOpen, onClose, info }) => {
  const { requester, requesterAddress, requesterSpecialty, requesterEmail } =
    info;
  const { pcp, pcpSpecialty, pcpAddress, pcpEmail } = info;

  return (
    <UIModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {pcp ? pcp : requester}
          <Text fontWeight="normal">
            {pcp ? pcpSpecialty : requesterSpecialty}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" flexDirection="column" gap={3}>
          <Box>
            <Badge colorScheme="blue">Wallet</Badge>
          </Box>
          <Text>{pcp ? pcpAddress : requesterAddress}</Text>
          <Box>
            <Badge colorScheme="red">Email</Badge>
          </Box>
          <Link
            color="blue.500"
            isExternal
            href={pcp ? "mailto:" + pcpEmail : "mailto:" + requesterEmail}
          >
            {pcp ? pcpEmail : requesterEmail}
          </Link>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </UIModal>
  );
};

export default Modal;

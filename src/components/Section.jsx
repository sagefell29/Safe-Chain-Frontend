import React from "react";
import { Box, Container } from "@chakra-ui/react";

const Section = ({ bg, children }) => {
  return (
    <Box bg={bg} py={{ base: 8, md: 20 }}>
      <Container maxW="container.xl">{children}</Container>
    </Box>
  );
};

export default Section;

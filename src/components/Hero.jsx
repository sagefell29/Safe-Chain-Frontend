import React from "react";
import {
  Stack,
  Heading,
  Button,
  Container,
  Image,
  Flex,
  Box,
  Link,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import Security from "../assets/security.svg";

const Hero = () => {
  let navigate = useNavigate();

  const connectWallet = async () => {
    navigate("/dashboard");
  };

  return (
    <Container maxW="container.xl" bg="blue.50">
      <Stack direction={{ base: "column", md: "row" }} py={8}>
        <Flex flex="1">
          <Stack justifyContent="center" gap={8}>
            <Box maxW="50ch">
              <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
                Secure, Decentralized Access to Record Transactions
              </Heading>
            </Box>
            <Stack direction="row" gap={8}>
              <Button colorScheme="blue" p={4} onClick={connectWallet}>
                Sign Up
              </Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex="0.75" pt={{ base: 4, md: 0 }}>
          <Image src={Security} alt="Security" />
        </Flex>
      </Stack>
    </Container>
  );
};

export default Hero;

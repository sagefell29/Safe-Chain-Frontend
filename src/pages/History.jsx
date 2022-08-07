/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { Stack, Wrap, Text, Heading } from "@chakra-ui/react";
import { Box, Image, Badge, Button, Flex, Spacer } from "@chakra-ui/react";
import moment from "moment";
import TransferCard from "../components/TransferCard";
import Sidebar from "../components/Sidebar";
import Breadcrumbs from "../components/Breadcrumbs";
import { requestArray } from "../wallet";

const History = () => {

  const [creditcard, setCreditCard] = useState([])

  const getCreditcardData = async () => {
    let token = sessionStorage.getItem("secretKey")

    const resp = await fetch("https://safe-chain.vercel.app/creditcard/get", {
      method: "POST",
      body: JSON.stringify({
        "token": token
      }),
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
        "Access-Control-Allow-Origin": "*"
      }
    });
    const tes = await resp.json()
    setCreditCard(tes.data);
    // console.log(creditcard)
    console.log(tes)

  }

  useEffect(() => {
    getCreditcardData()
  }, []);

  return (
    <Sidebar>
      <Breadcrumbs links={["Home", "Dashboard", "Credit Card"]} />
      <Heading mt={8} ml={4}>
        Saved Credit Cards
      </Heading>
      <Stack p={4} gap={3}>
        <Wrap spacing={8}>
          {creditcard.length === 0 ? <Text>No Saved Credit Cards Found</Text> : creditcard.map((currelem) => {
            return (
              <>
                <Box w="250px" rounded="15px"
                  overflow="hidden" bg="white" mt={10}>
                  <Box p={5}>
                    <Stack align="center">
                      <Badge variant="solid" colorScheme="blue"
                        rounded="full" px={2} fontSize='l'>
                        {currelem.bank_name}
                      </Badge>
                    </Stack>
                    <Stack align="center">
                      <Text as="h2" fontWeight="normal" my={2} >
                        Holder Name : {currelem.holder_name}
                      </Text>
                      <Text fontWeight="light">
                        Card Number : {currelem.number}
                      </Text>
                      <Text fontWeight="light">
                        Expiry Date : {currelem.expiry_date}
                      </Text>
                      <Text fontWeight="light">
                        CVV : {currelem.cvv}
                      </Text>
                    </Stack>
                    <Flex>
                      <Spacer />
                      {/* <Button variant="solid"
                        colorScheme="blue" size="sm">
                        Learn More
                      </Button> */}
                    </Flex>
                  </Box>
                </Box>

              </>
            )
          })
          }
        </Wrap>
      </Stack>
    </Sidebar>
  );
};

export default History;
/* eslint-disable array-callback-return */
import React, { useEffect } from "react";
import { Stack, Wrap, Text, Heading } from "@chakra-ui/react";
import { Box, Image, Badge, Button, Flex, Spacer }
  from "@chakra-ui/react";
import { requestArray } from "../wallet";
import TransferCard from "../components/TransferCard";
import Sidebar from "../components/Sidebar";
import Breadcrumbs from "../components/Breadcrumbs";
import { useState } from "react";

const Pending = () => {

  const [userpassword, setUserPassword] = useState([])

  const getPasswordData = async () => {
    let token = sessionStorage.getItem("secretKey")

    const resp = await fetch("https://safe-chain.vercel.app/password/get", {
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
    setUserPassword(tes.data);
    // console.log(userpassword)
    console.log(tes)
  }


  useEffect(() => {
    getPasswordData()
  }, []);

  return (
    <Sidebar>
      <Breadcrumbs links={["Home", "Dashboard", "Passwords"]} />
      <Heading mt={8} ml={4}>
        Saved Passwords
      </Heading>
      <Stack p={4} gap={3}>
        <Wrap spacing={8}>
          {userpassword.length === 0 ? <Text>No Passwords Found</Text> : userpassword.map((currelem) => {
            return (
              <>
                <Box w="220px" rounded="15px"
                  overflow="hidden" bg="white" mt={10}>
                  <Box p={5}>
                    <Stack align="center">
                      <Badge variant="solid" colorScheme="blue"
                        rounded="full" px={2} fontSize='l'>
                        {currelem.name}
                      </Badge>
                    </Stack>
                    <Stack align="center">
                      <Text as="h2" fontWeight="normal" my={2} >
                        Website : {currelem.website}
                      </Text>
                      <Text fontWeight="light">
                        Username : {currelem.username}
                      </Text>
                      <Text fontWeight="light">
                        Password : {currelem.password}
                      </Text>
                      <Text fontWeight="light">
                        Description : {currelem.description}
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
    </Sidebar >
  );
};

export default Pending;

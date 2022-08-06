import React, { useEffect, useState } from "react";
import {
  Stack,
  Input,
  Heading,
  FormControl,
  FormLabel,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";

import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import Breadcrumbs from "../components/Breadcrumbs";


const Dashboard = () => {
  const [pcpContract, setPcpContract] = useState(null);
  const [account, setAccount] = useState();
  // useEffect(() => {
  //   const fetchAddress = async () => {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const data = provider.send("eth_requestAccounts", []);
  //     return await data;
  //   };
  //   fetchAddress().then((result) => {
  //     setAccount(result);
  //   });
  // }, [pcpContract]);

  // const abbreviateAddress = (address) => {
  //   return (
  //     address.substring(0, 6) + "..." + address.substring(address.length - 4)
  //   );
  // };

  return (
    <>
      <Sidebar>
        <Breadcrumbs links={["Home", "Dashboard"]} />
        <Stack p={4} gap={3} >
          <Card >
            <Stack gap={3}>
              <Heading>Welcome to Your Dashboard.</Heading>
              <Text>
                {/* Your wallet address is{" "} */}
              </Text>
            </Stack>
          </Card>
          <Card>
            <FormControl>
              <FormLabel>Input Your  Contract Address</FormLabel>
              <Input
                placeholder="Enter Something"
                maxW="lg"
                onChange={(e) => {
                  setPcpContract(e.target.value);
                }}
              />
            </FormControl>
            <Button
              colorScheme="blue"
              mt={4}
            >
              Submit
            </Button>
          </Card>
        </Stack>
      </Sidebar>
    </>
  );
};

export default Dashboard;

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
import { getPatientRequests } from "../wallet";
import { ethers } from "ethers";

const Dashboard = () => {
  const [pcpContract, setPcpContract] = useState(null);
  const [account, setAccount] = useState();
  const toast = useToast();

  useEffect(() => {
    const fetchAddress = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const data = provider.send("eth_requestAccounts", []);
      return await data;
    };
    fetchAddress().then((result) => {
      setAccount(result);
    });
  }, [pcpContract]);

  const abbreviateAddress = (address) => {
    return (
      address.substring(0, 6) + "..." + address.substring(address.length - 4)
    );
  };

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
                placeholder="Contract Address"
                maxW="lg"
                onChange={(e) => {
                  setPcpContract(e.target.value);
                }}
              />
            </FormControl>
            <Button
              onClick={() => {
                getPatientRequests(pcpContract).then((res) => {
                  toast({
                    title: "Contract Address successfully added",
                    description: "You can now view your patient requests",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                });
              }}
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

/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { Stack, Wrap, Text, Heading } from "@chakra-ui/react";
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
    setUserPassword(tes.data);
    // console.log(userpassword)
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

        </Wrap>
      </Stack>
    </Sidebar>
  );
};

export default History;
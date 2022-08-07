/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { Stack, Wrap, Text, Heading } from "@chakra-ui/react";
import { Box, Image, Badge, Button, Flex, Spacer } from "@chakra-ui/react";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import Sidebar from "../components/Sidebar";
import Breadcrumbs from "../components/Breadcrumbs";
import CreditCard from "../components/CreditCard";


const History = () => {

  const [creditcard, setCreditCard] = useState([])
  const [flip, setFlip] = useState(false)
  const [focus, setFocus] = useState('')
  const cardFlip = () => {
    if (flip) {
      setFlip(false)
      setFocus('')
    } else {
      setFlip(true)
      setFocus('cvc')
    }
  }
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
                <CreditCard
                  id={currelem.id}
                  cvc={currelem.cvv}
                  expiry={currelem.expiry_date}
                  name={currelem.holder_name}
                  number={currelem.number}
                />
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
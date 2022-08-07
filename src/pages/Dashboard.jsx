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
  InputRightElement,
  InputGroup,
  toast
} from "@chakra-ui/react";
import { Textarea } from '@chakra-ui/react'
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import Breadcrumbs from "../components/Breadcrumbs";
import { Select } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";


const Dashboard = () => {

  const [savingLoading, setSavingLoading] = React.useState(false)
  const toast = useToast();

  // PASSWORD
  const [selectpassword, setSelectPassword] = React.useState("")
  const [categ, setCateg] = React.useState("");
  const [websitename, setWebsitename] = React.useState("")
  const [websiteurl, setWebsiteurl] = React.useState("")
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [show1, setShow1] = React.useState(false)
  const [passwordLoading, setPasswordLoading] = React.useState(false)

  // CREDIT CARD 
  const [creditcard, setCreditCard] = React.useState("")
  const [expirydate, setExpiryDate] = React.useState("")
  const [creditcardcvv, setCreditCardCVV] = React.useState("")
  const [creditbank, setCreditBank] = React.useState("")
  const [creditholder, setCreditHolder] = React.useState("")
  const [creditCardLoading, setCreditCardLoading] = React.useState(false)
  const [passwordFormVisibility, setPasswordFormVisibility] = React.useState(false)
  const navigate = useNavigate()
  const handleClick1 = () => setShow1(!show1)
  useEffect(()=>{
    if(!sessionStorage.getItem('secretKey')){
      navigate('/')
    }
  },[])
  const passwordSubmitClicked = async () => {
    let token = sessionStorage.getItem("secretKey")
    if (token == null) {
      toast({
        title: 'Error!',
        description: "Try To Login Again",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
    else {
      setSavingLoading(true)
      let result = await fetch("https://safe-chain.vercel.app/password/add", {
        method: "POST",
        body: JSON.stringify({
          "name": websitename,
          "website": websiteurl,
          "username": username,
          "password": password,
          "description": description,
          "token": token
        }),
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
          "Access-Control-Allow-Origin": "*"
        }
      })
      setSavingLoading(false)
      let test = await result.json()
      if (test.success) {
        toast({
          title: 'Success!',
          description: "Successfully Saved the Details",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }
      else {
        toast({
          title: 'Error!',
          description: "Some Error Occured Please Try Again Later",
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    }
  }

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
              <FormLabel>Select Category</FormLabel>
              <Select placeholder='Select option' size='md' mb='0.8rem'
                onChange={(categ) => { setCateg(categ.target.value) }}
                id="category" name="category" value={categ}>
                <option value='password'>Password</option>
                <option value='creditcard'>Credit Card</option>
              </Select>

              {/* PASSWORD CATEGORY FORM */}

              {categ === "password" && <>
                <FormLabel mt='0.8rem'>Enter the Website Name</FormLabel>
                <Input
                  value={websitename}
                  onChange={(e) => { setWebsitename(e.target.value) }}
                  pr='4.5rem'
                  mb='0.8rem'
                  placeholder='Enter Website Name'
                />

                <FormLabel mt='0.8rem'>Enter the Website URL</FormLabel>
                <Input
                  value={websiteurl}
                  onChange={(e) => { setWebsiteurl(e.target.value) }}
                  pr='4.5rem'
                  mb='0.8rem'
                  placeholder='Enter Website URL'
                />

                <FormLabel mt='0.8rem'>Enter the Username</FormLabel>
                <Input
                  value={username}
                  onChange={(e) => { setUsername(e.target.value) }}
                  pr='4.5rem'
                  mb='0.8rem'
                  placeholder='Enter Username'
                />

                <FormLabel mt='0.8rem'>Enter the Password</FormLabel>
                <InputGroup size='md'>
                  <Input
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                    pr='4.5rem'
                    mb='0.8rem'
                    placeholder='Enter Password'
                    type={show1 ? 'text' : 'password'}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick1}>
                      {show1 ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>

                <FormLabel mt='0.8rem'>Enter Description</FormLabel>
                <Textarea
                  value={description}
                  onChange={(e) => { setDescription(e.target.value) }}
                  pr='4.5rem'
                  mb='0.8rem'
                  placeholder='Enter Description'
                />
                <Button
                  colorScheme="blue"
                  mt={4}
                  onClick={passwordSubmitClicked}
                  isLoading={savingLoading} 
                  loadingText="Saving Details"
                >
                  Submit
                </Button>

              </>
              }

              {/* CREDIT CARD FORM DETAILS */}
              {categ === 'creditcard' &&
                <>
                  <FormLabel mt='0.8rem'>Enter Credit Card Details</FormLabel>
                  <Input
                    value={creditcard}
                    onChange={(e) => { setCreditCard(e.target.value) }}
                    pr='4.5rem'
                    mb='0.8rem'
                    placeholder='Credit Card Details'
                  />

                  <FormLabel mt='0.8rem'>Enter Expiry Date</FormLabel>
                  <Input
                    value={expirydate}
                    onChange={(e) => { setExpiryDate(e.target.value) }}
                    pr='4.5rem'
                    mb='0.8rem'
                    placeholder='Expiry Date in MM/YY Format'
                  />

                  <FormLabel mt='0.8rem'>Enter Credit Card Holder Name</FormLabel>
                  <Input
                    value={creditholder}
                    onChange={(e) => { setCreditHolder(e.target.value) }}
                    pr='4.5rem'
                    mb='0.8rem'
                    placeholder='Holder Name'
                  />

                  <FormLabel mt='0.8rem'>Enter CVV of Credit Card</FormLabel>
                  <Input
                    value={creditcardcvv}
                    onChange={(e) => { setCreditCardCVV(e.target.value) }}
                    pr='4.5rem'
                    mb='0.8rem'
                    placeholder='CVV'
                  />


                  <FormLabel mt='0.8rem'>Enter Credit Card Bank Name</FormLabel>
                  <Input
                    value={creditbank}
                    onChange={(e) => { setCreditBank(e.target.value) }}
                    pr='4.5rem'
                    mb='0.8rem'
                    placeholder='Bank Name'
                  />


                  <Button
                    colorScheme="blue"
                    mt={4}
                  >
                    Submit
                  </Button>

                </>
              }


            </FormControl>
          </Card>
        </Stack>
      </Sidebar>
    </>
  );
};

export default Dashboard;

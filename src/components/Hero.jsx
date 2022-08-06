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
  useDisclosure,
  useToast,
  toast,
  Textarea,
  useClipboard,
  Text
} from "@chakra-ui/react";
import axios from "axios"

import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  InputRightElement
} from '@chakra-ui/react'

import { useNavigate } from "react-router-dom";

import Security from "../assets/security.svg";

const Hero = () => {
  const toast = useToast()

  const [show, setShow] = React.useState(false)
  const [show1, setShow1] = React.useState(false)
  const [token, setToken] = React.useState(false);
  const [password, setPassword] = React.useState("")
  const [confirmpassword, setConfirmPassword] = React.useState("")
  let [value, setValue] = React.useState('')
  const { onCopy, hasCopied } = useClipboard(value);

  let navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const handleClick = () => setShow(!show)
  const handleClick1 = () => setShow1(!show1)

  let handleInputChange = (e) => {
    let inputValue = e.target.value
    setValue(inputValue)
  }

  const savePassword = async () => {
    if (password != confirmpassword || password.length == 0 || confirmpassword.length == 0) {
      toast({
        title: 'Error!',
        description: "Password and Re-Enter pasword not matched",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
    else {
      // console.log(password)
      let result = await fetch("https://safe-chain.vercel.app/user/create", {
        method: "POST",
        body: JSON.stringify({
          "password": password
        }),
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
          "Access-Control-Allow-Origin": "*"
        }
      })

      let test = await result.json()
      setValue(test.token)
      setToken(true)
      console.log("result", test)
    }
  }

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
                Secure, Decentralized Access to Your Data
              </Heading>
            </Box>
            <Stack direction="row" gap={8}>
              <Button colorScheme="blue" p={4} onClick={onOpen}>
                Sign Up
              </Button>
              <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Create your account</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl>
                      <FormLabel>Master Password</FormLabel>
                      <InputGroup size='md'>
                        <Input
                          value={password}
                          onChange={(e) => { setPassword(e.target.value) }}
                          pr='4.5rem'
                          type={show ? 'text' : 'password'}
                          placeholder='Enter password'
                        />
                        <InputRightElement width='4.5rem'>
                          <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Re-Enter Master Password</FormLabel>
                      <InputGroup size='md'>
                        <Input
                          value={confirmpassword}
                          onChange={(e) => { setConfirmPassword(e.target.value) }}
                          pr='4.5rem'
                          type={show1 ? 'text' : 'password'}
                          placeholder='Re-Enter password'
                        />
                        <InputRightElement width='4.5rem'>
                          <Button h='1.75rem' size='sm' onClick={handleClick1}>
                            {show1 ? 'Hide' : 'Show'}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={savePassword}>
                      Submit
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                  {token && <Box
                    value={value}
                    onChange={handleInputChange}
                    w='100%'
                    p='5'
                    color='black'
                    bg='blue.50'
                  >
                    <Text fontSize='xl'>
                      Please Keep this Encrypted Key Safely!
                    </Text>
                    <br></br>
                    {value}
                    <br></br>
                    <Button onClick={onCopy} ml={2}>
                      {hasCopied ? "Copied" : "Copy"}
                    </Button>
                  </Box>}
                </ModalContent>
              </Modal>
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

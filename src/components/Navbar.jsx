import React from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Button,
  Container,
  Heading,
  Link,
  VStack,
  FormControl,
  FormLabel,
  useToast,
  Input,
  InputGroup
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { NavLink, useNavigate } from "react-router-dom";
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



const Links = ["Home"];
const LinkURLS = ["/", "/about", "/contact"];

const ExternalLinks = ["About", "Github"];
const ExternalLinkUrls = [
  "https://devpost.com/software/safe-chain",//Devpost Link
  "https://github.com/alok27a/Cognition-Frontend",// Github link 
];

const externalLink = ({ link, index }) => {
  return (
    <Link
      key={index}
      href={ExternalLinkUrls[index]}
      isExternal
      color="gray.500"
    >
      {link}
    </Link>
  );
};

const MyNavLink = ({ link, index }) => {
  return (
    <NavLink to={LinkURLS[index]}>
      {({ isActive }) => (
        <Link color={isActive ? "blue.500" : "gray.500"}>{link}</Link>
      )}
    </NavLink>
  );
};

const Navbar = () => {
  const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure();
  let navigate = useNavigate();

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)



  const [show, setShow] = React.useState(false)
  const [show1, setShow1] = React.useState(false)
  const [password, setPassword] = React.useState("")
  const [token, setToken] = React.useState("")
  const [loginLoading, setLoginLoading] = React.useState(false)

  const handleClick = () => setShow(!show)
  const handleClick1 = () => setShow1(!show1)

  const signinClicked = async () => {
    if (password.length == 0 || token.length == 0) {
      toast({
        title: 'Error!',
        description: "No value Entered",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
    else {
      // console.log(password)
      setLoginLoading(true)
      let result = await fetch("https://safe-chain.vercel.app/user/login", {
        method: "POST",
        body: JSON.stringify({
          "password": password,
          "token": token
        }),
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
          "Access-Control-Allow-Origin": "*"
        }
      })
      setLoginLoading(false)
      let test = await result.json()
      if (test.success) {
        console.log("result", test)
        sessionStorage.setItem("secretKey",test.token)
        navigate("/dashboard");
      }
      else {
        toast({
          title: 'Error!',
          description: "Incorrect Password or Secret Key",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
     
    }
  }


  return (
    <Box px={4}>
      <Container maxW="container.xl" py={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            display={{ md: "none" }}
            aria-label={"Toggle menu"}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack
            spacing={8}
            justifyContent="space-between"
            w={{ base: "none", md: "full" }}
            mx={{ base: "auto", md: 0 }}
          >
            <HStack>
              <Heading as="h4" size="md">
                SafeChain
              </Heading>
            </HStack>
            <HStack spacing={8} display={{ base: "none", md: "flex" }}>
              {Links.map((link, index) => (
                <MyNavLink key={index + link} link={link} index={index} />
              ))}
              {ExternalLinks.map((link, index) =>
                externalLink({ link, index })
              )}
              <Button colorScheme="blue" p={4} onClick={onOpen} >
                Sign In
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
                          ref={initialRef}
                          placeholder='Enter Password Here'
                          type={show ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => { setPassword(e.target.value) }}
                        />
                        <InputRightElement width='4.5rem'>
                          <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel> Enter Secret Key</FormLabel>
                      <Input
                        placeholder='Enter Here'
                        value={token}
                        onChange={(e) => { setToken(e.target.value) }}
                      />
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={signinClicked} isLoading={loginLoading} loadingText="Signing In">
                      Sign In
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </HStack>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;

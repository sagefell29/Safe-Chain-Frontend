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
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { NavLink, useNavigate } from "react-router-dom";


const Links = ["Home"];
const LinkURLS = ["/", "/about", "/contact"];

const ExternalLinks = ["About", "Github"];
const ExternalLinkUrls = [
  "",//Devpost Link
  "",// Github link 
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
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  let navigate = useNavigate();

  const connectWallet = async () => {
    // await initWallet();
    navigate("/dashboard");
  };

  
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const [show, setShow] = React.useState(false)
  const [show1, setShow1] = React.useState(false)
 
  
  const handleClick = () => setShow(!show)
  const handleClick1 = () => setShow1(!show1)

  const signinClicked = ()=>{ 

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
              <Button colorScheme="blue" p={4} onClick={connectWallet}>
                Sign In
              </Button>
            </HStack>
          </HStack>
        </Flex>
      </Container>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <VStack as={"nav"} spacing={4} alignItems="left">
            {Links.map((link, index) => (
              <MyNavLink key={link} link={link} index={index} />
            ))}
            {ExternalLinks.map((link, index) => externalLink({ link, index }))}
            <Box>
              <Button colorScheme="blue" p={4} onClick={connectWallet}>
                Connect Wallet
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
                      <FormLabel>Renter Master Password</FormLabel>
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
                </ModalContent>
              </Modal>
            </Box>
          </VStack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;

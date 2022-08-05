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
                DPASSWORD
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
                Sign Up
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
            </Box>
          </VStack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;

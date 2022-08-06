import React from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  Link,
  Drawer,
  DrawerContent,
  useDisclosure,
  Heading,
} from "@chakra-ui/react";
import { FaHome, FaUserClock, FaHistory, FaAngleDoubleRight } from "react-icons/fa";

import { HamburgerIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";

const LinkItems = [
  { name: "All Items", icon: FaAngleDoubleRight, path: "/dashboard/allitem" },
  { name: "Home", icon: FaHome, path: "/dashboard" },
  { name: "Pending Requests", icon: FaUserClock, path: "/dashboard/pending" },
  { name: "History", icon: FaHistory, path: "/dashboard/history" },
];

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box bg="blue.50" w={{ base: "full", md: 60 }} pos="fixed" h="full" {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Flex alignItems="center" gap={2}>
          <Link as={NavLink} to="/">
            <Heading as="h4" size="md">
              SafeChain
            </Heading>
          </Link>
        </Flex>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem as={NavLink} key={link.name} icon={link.icon} to={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Link
      as={NavLink}
      end
      to={rest.to}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      {({ isActive }) => (
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          mb={3}
          cursor="pointer"
          bg={isActive ? "blue.500" : "white"}
          color={isActive ? "white" : "gray.600"}
          _hover={{
            bg: "blue.500",
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      )}
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg="white"
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
      justifyContent="flex-start"
      gap={8}
      {...rest}
    >
      <IconButton
        onClick={onOpen}
        aria-label="open menu"
        icon={<HamburgerIcon />}
      />
      <Flex alignItems="center" gap={2}>
        <Heading as="h4" size="md">
          dpassword
        </Heading>
      </Flex>
    </Flex>
  );
};

const Sidebar = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg="gray.100">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;

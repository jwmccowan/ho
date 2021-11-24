import { Button } from "@chakra-ui/button";
import { Box, Container, Flex, List, ListItem, Text } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import Link from "next/link";
import { useState } from "react";
import { FaGift, FaGripLines, FaSleigh, FaTimes } from "react-icons/fa";
import useLogout from "../../../hooks/use-logout";
import useSession from "../../../hooks/use-session";
import WithChildren from "../../../utils/prop-utils/with-children.interface";

function Nav({ children }: WithChildren) {
  return (
    <Box
      as="nav"
      bg={["green.500", "green.500", "transparent", "transparent"]}
      color={["white", "white", "green.700", "green.700"]}
    >
      <Container maxW="container.md">
        <Flex align="center" justify="space-between" wrap="wrap" py={8} mb={8}>
          {children}
        </Flex>
      </Container>
    </Box>
  );
}

function LoginButton() {
  return (
    <Link href="/login" passHref>
      <Button
        size="sm"
        rounded="md"
        color={["green.500", "green.500", "white", "white"]}
        bg={["white", "white", "green.500", "green.500"]}
        _hover={{
          bg: ["green.100", "green.100", "green.600", "green.600"],
        }}
      >
        Login
      </Button>
    </Link>
  );
}

function LogoutButton() {
  const [logout, logoutLoading] = useLogout();
  return (
    <chakra.button
      onClick={logout}
      disabled={logoutLoading}
      bg={["green.500", "green.500", "transparent", "transparent"]}
      color={["white", "white", "green.700", "green.700"]}
    >
      Logout
    </chakra.button>
  );
}

interface MenuItemProps extends WithChildren {
  isBold?: boolean;
  isLast?: boolean;
}

function MenuItem({ children }: MenuItemProps) {
  return (
    <Text mb={{ base: 8, sm: 0 }} mr={{ base: 0, sm: 8 }} display="block">
      {children}
    </Text>
  );
}

export default function TopNav(): JSX.Element {
  const session = useSession();
  const [show, setShow] = useState(true);
  return (
    <Nav>
      <Flex align="center">
        <FaSleigh fontSize="3rem" />
      </Flex>
      <Box
        cursor="pointer"
        display={{ base: "block", md: "none" }}
        onClick={() => setShow((prev) => !prev)}
      >
        {show ? <FaTimes /> : <FaGripLines />}
      </Box>
      <Box
        display={{ base: show ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Flex
          align={["center", "center", "center", "center"]}
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <MenuItem>
            <Link href="/">Home</Link>
          </MenuItem>
          <MenuItem>
            <Link href="/profile">Profile</Link>
          </MenuItem>
          {session && <LogoutButton />}
          {!session && <LoginButton />}
        </Flex>
      </Box>
    </Nav>
  );
}

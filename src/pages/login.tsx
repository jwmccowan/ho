import Head from "next/head";
import { useState } from "react";
import useEmailLogin from "../hooks/use-email-login";
import useGoogleLogin from "../hooks/use-google-login";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import useSession from "../hooks/use-session";
import { Button } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import router from "next/router";
import { FaGoogle } from "react-icons/fa";

function Or(): JSX.Element {
  return (
    <Flex alignItems="center" p={4}>
      <Box bgColor="gray.400" flexGrow={1} height="1px" />
      <Text color="gray.400" p={4}>
        OR
      </Text>
      <Box bgColor="gray.400" flexGrow={1} height="1px" />
    </Flex>
  );
}

export default function LoginPage(): JSX.Element {
  const [googleLogin, googleLoading] = useGoogleLogin();
  const [emailLogin, emailLoading] = useEmailLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <section>
        <Container maxW="container.md" centerContent>
          <Box p={8} borderRadius={10}>
            <Heading as="h1" size="xl" mb={8}>
              Sign up or sign in
            </Heading>
            <Text mb={4}>It might be easiest to...</Text>
            <Button
              colorScheme="red"
              variant="solid"
              isFullWidth
              disabled={googleLoading}
              leftIcon={<FaGoogle />}
              onClick={googleLogin}
            >
              Log in with google
            </Button>
            <Or />
            <Text>You could log in or sign up with your email</Text>
            <Text mb={4}>No password required!</Text>
            <Flex
              as="form"
              flexDir="column"
              onSubmit={handleSubmit((values) => emailLogin(values.email))}
              noValidate
            >
              {errors.email && (
                <Text
                  color="red.500"
                  mb={1}
                >{`* ${errors.email.message}`}</Text>
              )}
              <Input
                mb={8}
                isInvalid={!!errors.email}
                type="email"
                placeholder="Your email"
                {...register("email", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                  required: "Required",
                })}
              />
              <Button colorScheme="green" disabled={emailLoading} type="submit">
                Log in with email
              </Button>
            </Flex>
          </Box>
        </Container>
      </section>
    </>
  );
}

import type { NextPage } from "next";
import Head from "next/head";
import { Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import createEvent from "../api/create-event";
import { Button } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import EventList from "../components/molecules/EventList";

export default function Home(): JSX.Element {
  const [loading, setLoading] = useState(false);

  const handleCreateClick = async () => {
    try {
      setLoading(true);
      const data = await createEvent(
        "My Event",
        new Date(),
        "This describes a fun event"
      );
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Ho</title>
      </Head>
      <section>
        <Container maxW="container.md">
          <Heading as="h1" size="2xl" mb={8}>
            Welcome to Ho
          </Heading>
          <Text mb={4}>Your first stop for all your Secret Santa needs!</Text>
        </Container>
      </section>
      <section>
        <Container maxW="container.md">
          <Heading as="h2" size="xl" mb={8}>
            Your upcoming events
          </Heading>
          <Button onClick={handleCreateClick}>
            {loading ? "Loading..." : "Create Event"}
          </Button>
          <EventList />
        </Container>
      </section>
    </>
  );
}

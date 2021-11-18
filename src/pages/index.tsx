import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import createEvent from "../api/create-event";
import getEvents from "../api/get-events";
import Button from "../components/atoms/Button";
import Container from "../components/atoms/Container";
import Layout from "../components/layouts/Layout";
import EventList from "../components/molecules/EventList";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);

  const handleCreateClick = async () => {
    try {
      setLoading(true);
      const data = await createEvent(
        "My Event",
        new Date(),
        "This describes a fun event"
      );
      console.log("eggs", data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  const handleGetClick = async () => {
    try {
      setLoading(true);
      const data = await getEvents();
      console.log("eggs", data);
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
      <Layout>
        <section className="py-8">
          <Container>
            <h1 className="text-4xl mb-4 text-gray-800">Welcome to Ho</h1>
            <p className="text-xl text-gray-600">
              Your first stop for all your Secret Santa needs!
            </p>
          </Container>
        </section>
        <section className="bg-red-300 py-12">
          <Container>
            <h2 className="text-2xl mb-8 text-red-900">Your upcoming events</h2>
            <Button onClick={handleCreateClick}>
              {loading ? "Loading..." : "Create Event"}
            </Button>
            <Button onClick={handleGetClick}>
              {loading ? "Loading..." : "Get Event"}
            </Button>
            <EventList />
          </Container>
        </section>
      </Layout>
    </>
  );
};

export default Home;

import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import createEvent from "../api/create-event";
import HoEvent from "../api/interfaces/ho-event.interface";
import Button from "../components/atoms/Button";
import Container from "../components/atoms/Container";
import Layout from "../components/layouts/Layout";
import EventList from "../components/molecules/EventList";
import { supabase } from "../utils/supabase.client";

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
            <EventList />
          </Container>
        </section>
      </Layout>
    </>
  );
};

export default Home;

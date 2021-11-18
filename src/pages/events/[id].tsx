import Head from "next/head";
import { useRouter } from "next/router";
import { NextPage } from "next/types";
import useSWR from "swr";
import HoEvent from "../../api/interfaces/ho-event.interface";
import Container from "../../components/atoms/Container";
import Layout from "../../components/layouts/Layout";
import { supabase } from "../../utils/supabase.client";

async function getEvent(id: string): Promise<HoEvent> {
  const { data: event, error } = await supabase
    .from("event")
    .select()
    .eq("event.id", id)
    .single();
  if (error) {
    throw error;
  }
  return event as HoEvent;
}

export default function Event() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: event, isValidating: loading } = useSWR(
    ["event_event_page", id],
    (_, eventId) => getEvent(eventId)
  );
  return (
    <>
      <Head>
        <title>Event</title>
      </Head>
      <Layout>
        {loading && !event && <p>Loading...</p>}
        {!event && <p>Event not found</p>}
        {!loading && !!event && (
          <section className="py-8">
            <Container>
              <h1 className="text-4xl mb-4 text-gray-800">{event.title}</h1>
              <p className="text-xl text-gray-600">{event.description}</p>
            </Container>
          </section>
        )}
      </Layout>
    </>
  );
}

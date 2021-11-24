import Head from "next/head";
import { useRouter } from "next/router";
import { NextPage } from "next/types";
import useSWR from "swr";
import HoEvent from "../../api/interfaces/ho-event.interface";
import { Container } from "@chakra-ui/react";
import { supabase } from "../../utils/supabase.client";

async function getEvent(id: string): Promise<HoEvent> {
  const { data: event, error } = await supabase
    .from("event")
    .select(
      `
      id,
      title,
      description,
      users (
        id,
        profile (
          username
        )
      )
    `
    )
    .eq("id", id)
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
      {loading && !event && <p>Loading...</p>}
      {!event && <p>Event not found</p>}
      {!loading && !!event && (
        <>
          <section className="pt-8">
            <Container>
              <h1 className="text-4xl mb-4 text-gray-800 font-bold">
                {event.title}
              </h1>
              <p className="text-xl text-gray-600">{event.description}</p>
            </Container>
          </section>
          <section className="my-8">
            <Container>
              <h2 className="text-2xl mb-4 text-gray-800">Participants</h2>
            </Container>
          </section>
        </>
      )}
    </>
  );
}

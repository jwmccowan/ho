import Head from "next/head";
import { useRouter } from "next/router";
import { GetServerSidePropsContext, NextPage } from "next/types";
import { useEffect, useState } from "react";
import getEvent from "../../api/get-event";
import HoEvent from "../../api/interfaces/ho-event.interface";
import Container from "../../components/atoms/Container";
import Layout from "../../components/layouts/Layout";
import { supabase } from "../../utils/supabase.client";

const Event: NextPage = () => {
  const router = useRouter();
  const [event, setEvent] = useState<HoEvent | null>(null);
  const [loading, setLoading] = useState(false);
  const id = router.query.id as string;
  useEffect(() => {
    setLoading(true);
    getEvent(id)
      .then(setEvent)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);
  return (
    <>
      <Head>
        <title>Event</title>
      </Head>
      <Layout>
        {loading && <p>Loading...</p>}
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
};

export default Event;

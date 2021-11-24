import Head from "next/head";
import useSWR from "swr";
import HoProfile from "../api/interfaces/ho-profile.interface";
import { Container } from "@chakra-ui/react";
import { supabase } from "../utils/supabase.client";
import ProfileView from "../components/molecules/ProfileView";
import { Button } from "@chakra-ui/react";
import useAuth from "../hooks/use-auth";

async function getProfile(id: string): Promise<HoProfile | null> {
  const { data, error, status } = await supabase
    .from("profile")
    .select(
      `
          id,
          username,
          website,
          avatar_url
        `
    )
    .eq("id", id)
    .single();

  if (error && status !== 406) {
    throw error;
  }
  return data as HoProfile | null;
}

async function updateProfile(profile: Partial<HoProfile>): Promise<HoProfile> {
  let { data, error } = await supabase.from("profile").upsert(profile);
  if (error) {
    throw error;
  }
  if (data && data.length > 0) {
    return data[0];
  }
  throw new Error("Might not have updated, please refresh page.");
}

export default function Profile() {
  const { user } = useAuth();
  const {
    data: profile,
    isValidating: profileLoading,
    mutate,
  } = useSWR(["profile", user?.id], (_, id) => getProfile(id));
  async function submitHandler(prof: HoProfile) {
    await mutate(() =>
      updateProfile({
        ...prof,
        id: user?.id,
      })
    );
  }
  async function uploadHandler(id: string, avatar_url: string) {
    await mutate(() => updateProfile({ id, avatar_url }));
  }
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <section className="mt-8">
        <Container>
          {!profile && profileLoading && "Loading..."}
          {profile && <ProfileView profile={profile} />}
          {!profile && !profileLoading && <Button>Create your profile</Button>}
        </Container>
      </section>
    </>
  );
}

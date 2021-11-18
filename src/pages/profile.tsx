import Head from "next/head";
import { useState, useEffect, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/atoms/Button";
import TextInput from "../components/atoms/TextInput";
import Layout from "../components/layouts/Layout";
import useSession from "../hooks/use-session";
import { supabase } from "../utils/supabase.client";
import useAuth from "../hooks/use-auth";
import Container from "../components/atoms/Container";
import useCreateWishlist from "../hooks/use-create-wishlist";
import useSWR, { useSWRConfig } from "swr";
import Wishlist from "../api/interfaces/wishlist.interface";

interface Profile {
  id: string;
  username?: string;
  website?: string;
  avatar_url?: string;
}

async function getProfile(id: string): Promise<Profile | null> {
  const { data, error, status } = await supabase
    .from("profile")
    .select(
      `
          id,
          username,
          website,
          avatar_url,
          wishlist (
            title,
            wishlist_item (
              title,
              url
            )
          )
        `
    )
    .eq("profile.id", id)
    .single();

  if (error && status !== 406) {
    throw error;
  }
  return data as Profile | null;
}

async function updateProfile(profile: Profile): Promise<Profile> {
  let { data, error } = await supabase.from("profile").upsert(profile);
  if (error) {
    throw error;
  }
  if (data && data.length > 0) {
    return data[0];
  }
  return profile;
}

interface ProfileFormProps {
  profile: Profile;
  onSubmit: (profile: Profile) => void;
}

function ProfileForm(props: ProfileFormProps): JSX.Element {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: props.profile.username,
      avatar_url: props.profile.avatar_url,
      website: props.profile.website,
    },
  });

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(props.onSubmit)}>
      <label className="mb-8">
        Username
        <TextInput
          className="w-full"
          {...register("username", { required: "Required" })}
        />
      </label>
      <label className="mb-8">
        Website
        <TextInput className="w-full" {...register("website")} />
      </label>
      <label className="mb-8">
        Avatar_url
        <TextInput className="w-full" {...register("avatar_url")} />
      </label>
      <Button type="submit">Update Profile</Button>
    </form>
  );
}

async function getWishlists() {
  const { data: wishlists, error } = await supabase.from("wishlist");
  if (error) {
    throw error;
  }
  return wishlists as Wishlist[];
}

export default function Profile() {
  const session = useAuth();
  const [createWishlist, wishlistLoading] = useCreateWishlist();
  const { data: wishlists, isValidating: wishlistsLoading } = useSWR(
    "all_wishlists",
    getWishlists
  );
  const { data: profile, isValidating: profileLoading } = useSWR(
    ["profile", session?.user?.id],
    getProfile
  );
  const { mutate } = useSWRConfig();
  async function submitHandler(prof: Profile) {
    await mutate(["profile", session?.user?.id], () =>
      updateProfile({
        ...prof,
        id: profile?.id as any,
      })
    );
  }

  useAuth();

  if (!session?.user) {
    return <div>Uh oh!</div>;
  }

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Layout>
        <section className="mt-8">
          <Container>
            <h1 className="text-4xl">Profile</h1>
          </Container>
        </section>
        <section className="mt-8">
          <Container>
            {profile && (
              <ProfileForm profile={profile} onSubmit={submitHandler} />
            )}
            {!profile && profileLoading && <p>Loading...</p>}
          </Container>
        </section>
        <section className="mt-8">
          <Container>
            <h2 className="text-2xl mb-8">Wishlists</h2>
            <Button
              className="mb-8"
              onClick={() =>
                createWishlist("My Good Wishlist", "This is my wishlist")
              }
            >
              {wishlistLoading ? "Loading..." : "Create Wishlist"}
            </Button>
            {wishlistsLoading && <p>Loading...</p>}
            <ul>
              {(wishlists ?? []).map((list) => (
                <li key={list.id}>
                  <h3 className="text-xl">{list.title}</h3>
                  <p className="text-gray-600">{list.description}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      </Layout>
    </>
  );
}

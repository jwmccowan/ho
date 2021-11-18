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
import useSWR from "swr";
import Wishlist from "../api/interfaces/wishlist.interface";

interface Profile {
  username?: string;
  website?: string;
  avatar_url?: string;
}

function useProfile(): [Profile | null, typeof updateProfile, boolean] {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const session = useSession();

  const getProfile = useCallback(async function () {
    try {
      setLoading(true);
      const user = supabase.auth.user();

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
        .eq("id", user!.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setProfile(data);
      } else {
        setProfile({
          username: "",
          avatar_url: "",
          website: "",
        });
      }
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (profile: Profile) => {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user!.id,
        ...profile,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profile").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getProfile();
  }, [getProfile, session]);

  return [profile, updateProfile, loading];
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
  const user = useAuth();
  const [profile, updateProfile, loading] = useProfile();
  const [createWishlist, wishlistLoading] = useCreateWishlist();
  const { data: wishlists, isValidating: wishlistsLoading } = useSWR(
    "all_wishlists",
    getWishlists
  );

  useAuth();

  if (!user) {
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
            {profile && (
              <ProfileForm profile={profile} onSubmit={updateProfile} />
            )}
            {!profile && <p>Loading...</p>}
          </Container>
        </section>
        <section className="mt-8">
          <Container>
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

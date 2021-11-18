import Head from "next/head";
import { useState, useEffect, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/atoms/Button";
import TextInput from "../components/atoms/TextInput";
import Layout from "../components/layouts/Layout";
import useSession from "../hooks/use-session";
import { supabase } from "../utils/supabase.client";

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
        .from("profiles")
        .select(`username, website, avatar_url`)
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

      let { error } = await supabase.from("profiles").upsert(updates, {
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
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <label>
        Username
        <TextInput {...register("username", { required: "Required" })} />
      </label>
      <label>
        Website
        <TextInput {...register("website")} />
      </label>
      <label>
        Avatar_url
        <TextInput {...register("avatar_url")} />
      </label>
      <Button type="submit">Update Profile</Button>
    </form>
  );
}

export default function Profile() {
  const [profile, updateProfile, loading] = useProfile();

  const session = useSession();

  if (!session?.user) {
    return <div>Uh oh!</div>;
  }

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Layout>
        {profile && <ProfileForm profile={profile} onSubmit={updateProfile} />}
        {!profile && <p>Loading...</p>}
      </Layout>
    </>
  );
}

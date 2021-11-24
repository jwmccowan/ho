import { User } from "@supabase/gotrue-js";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import HoProfile from "../../api/interfaces/ho-profile.interface";
import { Button } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import ProfileView from "../../components/molecules/ProfileView";
import useAuth from "../../hooks/use-auth";
import { supabase } from "../../utils/supabase.client";

async function getProfile(id: string): Promise<HoProfile | null> {
  const { error, data } = await supabase
    .from("profile")
    .select()
    .eq("id", id)
    .single();
  if (error) {
    throw error;
  }
  return (data ?? null) as HoProfile | null;
}

export default function ProfileIdPage({ user }: { user: User }): JSX.Element {
  useAuth();
  const router = useRouter();
  const id = router.query.id as string;
  const { data: profile, isValidating: profileLoading } = useSWR(
    ["profile", id],
    (_, profileId) => getProfile(profileId)
  );
  return (
    <section>
      <Container>
        {!profile && profileLoading && "Loading..."}
        {profile && <ProfileView profile={profile} />}
        {!profile && !profileLoading && (
          <>
            <h1 className="text-4xl font-bold my-8">Profile not found</h1>
            <p className="">
              {"Looks like this user hasn't set up their profile yet."}
            </p>
            <p>If you know them, let them know to create a wishlist or two!</p>
          </>
        )}
        {user.id === id && (
          <>
            <p>
              Looks like this is you, would you like to update your profile?
            </p>
            <Button>Update profile</Button>
          </>
        )}
      </Container>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
}): Promise<any> => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  // We can do a re-direction from the server
  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  // or, alternatively, can send the same values that client-side context populates to check on the client and redirect
  // The following lines won't be used as we're redirecting above
  return {
    props: {
      user,
      loggedIn: !!user,
    },
  };
};

import { User } from "@supabase/supabase-js";
import { supabase } from "../utils/supabase.client";

export default function Protected({ user }: { user: User }) {
  return <div>{JSON.stringify(user)}</div>;
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return { props: {}, redirect: { destination: "/sign-in" } };
  }
  return { props: { user } };
}

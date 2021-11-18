import { User } from "@supabase/supabase-js";
import { NextApiRequest } from "next";
import { supabase } from "../utils/supabase.client";

export default function Protected({ user }: { user: User }) {
  return <div>{JSON.stringify(user)}</div>;
}

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return { props: {}, redirect: { destination: "/sign-in" } };
  }
  return { props: { user } };
}

import useSWR from "swr";
import useAuth from "../hooks/use-auth";
import { supabase } from "../utils/supabase.client";

export default function Wishlists(): JSX.Element {
  useAuth();
  const { data: wishlists, error } = useSWR("check_login", () =>
    supabase.from("wishlist")
  );
  if (error) {
    return <div>Error!</div>;
  }
  return <div>{JSON.stringify(wishlists)}</div>;
}

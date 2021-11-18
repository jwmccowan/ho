import { supabase } from "../utils/supabase.client";
import useSWR from "swr";
import { useRouter } from "next/router";

export default function useAuth(redirect = true) {
  const {
    data: session,
    error,
    isValidating,
  } = useSWR("check_login", () => supabase.auth.session());
  const router = useRouter();
  if (error) {
    throw error;
  }
  if (!isValidating && !session && redirect) {
    router.push("/login");
  }
  return session ?? null;
}

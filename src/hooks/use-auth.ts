import { supabase } from "../utils/supabase.client";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Session, User } from "@supabase/gotrue-js";
import { useEffect } from "react";

export default function useAuth(redirect = true): {
  session: Session | null;
  user: User | null;
} {
  const {
    data: session,
    error,
    isValidating,
  } = useSWR("check_login", () => supabase.auth.session());
  const router = useRouter();
  if (error) {
    throw error;
  }
  if (!isValidating && !session?.user && redirect) {
    router.push("/login");
  }
  return { session: session ?? null, user: session?.user ?? null };
}

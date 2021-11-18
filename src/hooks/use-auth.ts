import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "../utils/supabase.client";

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  useEffect(() => {
    async function fetchProfile() {
      const user = supabase.auth.user();
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
      }
    }
    fetchProfile();
  }, [router]);
  return user;
}

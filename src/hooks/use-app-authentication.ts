import { useRouter } from "next/router";
import { useEffect } from "react";
import { supabase } from "../utils/supabase.client";

export default function useAppAuthentication() {
  const router = useRouter();
  useEffect(() => {
    async function handleAuthChange(event: any, session: any) {
      await fetch("/api/auth", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        credentials: "same-origin",
        body: JSON.stringify({ event, session }),
      });
    }
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleAuthChange(event, session);
        if (event === "SIGNED_OUT") {
          router.push("/");
        }
      }
    ) as any;
    return () => {
      authListener.unsubscribe();
    };
  }, [router]);
}

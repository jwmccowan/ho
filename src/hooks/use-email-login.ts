import { User } from "@supabase/supabase-js";
import { useCallback, useState } from "react";
import { supabase } from "../utils/supabase.client";

type LoginFunction = (email: string) => Promise<[User, null] | [null, Error]>;

export default function useEmailLogin(): [LoginFunction, boolean] {
  const [loading, setLoading] = useState(false);
  const login: LoginFunction = useCallback(async (email: string) => {
    try {
      setLoading(true);
      const { error, user } = await supabase.auth.signIn({
        email,
      });
      if (error) {
        throw error;
      }
      return [user!, null];
    } catch (error) {
      return [null, error as Error];
    } finally {
      setLoading(false);
    }
  }, []);
  return [login, loading];
}

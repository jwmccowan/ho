import { User } from "@supabase/supabase-js";
import { useCallback, useState } from "react";
import { supabase } from "../utils/supabase.client";

type LogoutFunction = () => Promise<{ error?: Error }>;

export default function useLogout(): [LogoutFunction, boolean] {
  const [loading, setLoading] = useState(false);
  const logout = useCallback(async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      return {};
    } catch (error) {
      return { error: error as Error };
    } finally {
      setLoading(false);
    }
  }, []);
  return [logout, loading];
}

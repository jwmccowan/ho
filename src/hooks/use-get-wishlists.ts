import { useCallback, useEffect, useState } from "react";
import Wishlist from "../api/interfaces/wishlist.interface";
import { supabase } from "../utils/supabase.client";
import useAuth from "./use-auth";

export default function useGetWishlists(): [Wishlist[], boolean] {
  const user = useAuth();
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getWishlists() {
      if (!user) {
        return [];
      }
      const { error, data } = await supabase
        .from("wishlist")
        .select()
        .eq("wishlist.profile_id", user?.id);
      if (error) {
        throw error;
      }
      return data as Wishlist[];
    }
    setLoading(true);
    getWishlists()
      .then(setWishlists)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);
  return [wishlists, loading];
}

import { useCallback, useState } from "react";
import createWishlistFn from "../api/create-wishlist";
import useAuth from "./use-auth";

export default function useCreateWishlist(): [typeof createWishlist, boolean] {
  const user = useAuth();
  const [loading, setLoading] = useState(false);
  const createWishlist = useCallback(
    async (title: string, description?: string) => {
      try {
        setLoading(true);
        if (!user) {
          throw new Error("Must be signed in!");
        }
        return createWishlistFn(title, user.id, description);
      } catch (e) {
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [user]
  );
  return [createWishlist, loading];
}

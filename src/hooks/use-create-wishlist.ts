import { useCallback, useState } from "react";
import createWishlistFn from "../api/create-wishlist";
import useAuth from "./use-auth";

export default function useCreateWishlist(): [typeof createWishlist, boolean] {
  const session = useAuth();
  const [loading, setLoading] = useState(false);
  const createWishlist = useCallback(
    async (title: string, description?: string) => {
      try {
        setLoading(true);
        if (!session || !session.user) {
          throw new Error("Must be signed in!");
        }
        return createWishlistFn(title, session.user.id, description);
      } catch (e) {
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [session]
  );
  return [createWishlist, loading];
}

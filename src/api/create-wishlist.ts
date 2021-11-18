import { supabase } from "../utils/supabase.client";
import Wishlist from "./interfaces/wishlist.interface";

export default async function createWishlist(
  title: string,
  profile_id: string,
  description?: string
): Promise<Wishlist> {
  let { error, data } = await supabase.from("wishlist").insert({
    title,
    description,
    profile_id,
  });

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error("No data was returned");
  }

  return data as unknown as Wishlist;
}

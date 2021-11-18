import { supabase } from "../utils/supabase.client";
import HoEvent from "./interfaces/ho-event.interface";

export default async function getEvent(id: string): Promise<HoEvent | null> {
  let { error, data } = await supabase
    .from("event")
    .select()
    .eq("event.id", id)
    .single();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error("No data was returned");
  }

  return data as unknown as HoEvent;
}

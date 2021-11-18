import { supabase } from "../utils/supabase.client";
import HoEvent from "./interfaces/ho-event.interface";

export default async function getEvents(): Promise<HoEvent[]> {
  let { error, data } = await supabase.from("event");
  if (error) {
    throw new Error(error.message);
  }
  return data ?? [];
}

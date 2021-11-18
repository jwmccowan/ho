import { supabase } from "../utils/supabase.client";
import HoEvent from "./interfaces/ho-event.interface";

export default async function getEvent(id: string): Promise<HoEvent | null> {
  let { error, data } = await supabase
    .from("events")
    .select("*")
    .eq("events.id", id)
    .single();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error("No data was returned");
  }

  console.log("eggs", data);

  return data as unknown as HoEvent;
}

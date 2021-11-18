import { supabase } from "../utils/supabase.client";
import HoEvent from "./interfaces/ho-event.interface";

export default async function createEvent(
  title: string,
  date: Date,
  description?: string
): Promise<HoEvent> {
  const user = supabase.auth.user();
  if (!user) {
    throw new Error("Must be signed in!");
  }
  let { error, data } = await supabase.from("event").insert({
    created_at: new Date(),
    event_date_time: date,
    title,
    description,
    host: user.id,
  });

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error("No data was returned");
  }

  return data as unknown as HoEvent;
}

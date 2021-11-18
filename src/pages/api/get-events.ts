import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabase.client";

export default async function getEvents(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { error, data } = await supabase.from("event");

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json({ events: data ?? [] });
}

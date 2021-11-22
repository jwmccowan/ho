import { supabase } from "../supabase.client";

export async function getUrl(path: string, bucket: string): Promise<string> {
  const { data, error } = await supabase.storage.from(bucket).download(path);
  if (error) {
    throw error;
  }
  return URL.createObjectURL(data);
}

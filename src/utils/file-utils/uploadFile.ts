import { supabase } from "../supabase.client";

export async function uploadFile(file: File, bucket: string) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;
  let { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);
  if (uploadError) {
    throw uploadError;
  }
  return filePath;
}

"use server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_PROJECT_URL as string,
  process.env.SUPABASE_API_KEY as string
);

const BUCKET_NAME = process.env.SUPABASE_BUCKET_NAME as string;
export const uploadFileToBucket = async (path: string, file: File) => {
  const result = await supabase.storage.from(BUCKET_NAME).upload(path, file);
  if (result.error) {
    console.error(result.error);
    throw Error(result.error.message);
  }
  return result.data.path;
};

export const getFilePathFromBucket = (path: string) => {
  const result = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);

  return result.data.publicUrl;
};

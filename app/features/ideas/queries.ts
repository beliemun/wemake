import type { Database } from "~/supabase-client";
import type { SupabaseClient } from "@supabase/supabase-js";

export const getGptIdeas = async (
  client: SupabaseClient<Database>,
  { limit }: { limit: number }
) => {
  const { data, error } = await client.from("gpt_ideas_view").select("*").limit(limit);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getGptIdea = async (
  client: SupabaseClient<Database>,
  { gpt_idea_id }: { gpt_idea_id: string }
) => {
  const { data, error } = await client
    .from("gpt_ideas_view")
    .select("*")
    .eq("gpt_idea_id", parseInt(gpt_idea_id))
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

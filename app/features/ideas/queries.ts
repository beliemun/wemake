import client from "~/supabase-client";

export const getGptIdeas = async ({ limit }: { limit: number }) => {
  const { data, error } = await client.from("gpt_ideas_view").select("*").limit(limit);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getGptIdea = async ({ gpt_idea_id }: { gpt_idea_id: string }) => {
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

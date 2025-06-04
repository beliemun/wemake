import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supabase-client";

export const claimIdea = async (
  client: SupabaseClient<Database>,
  { ideaId, userid }: { ideaId: string; userid: string }
) => {
  const { error } = await client
    .from("gpt_ideas")
    .update({ claimed_by: userid, claimed_at: new Date().toISOString() })
    .eq("gpt_idea_id", Number(ideaId))
    .select()
    .single();

  if (error) throw error;
};

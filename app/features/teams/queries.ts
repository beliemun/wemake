import type { Database } from "~/supabase-client";
import type { SupabaseClient } from "@supabase/supabase-js";

export const getTeams = async (client: SupabaseClient<Database>, { limit }: { limit: number }) => {
  const { data, error } = await client
    .from("teams")
    .select(
      `
        team_id,
        roles,
        product_description,
        team_leader:profiles!inner(
            username,
            avatar
        )
    `
    )
    .limit(limit);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getTeamById = async (client: SupabaseClient<Database>, teamId: number) => {
  const { data, error } = await client
    .from("teams")
    .select(
      `
        *,
        team_leader:profiles!inner(
            username,
            avatar,
            role
        )`
    )
    .eq("team_id", teamId)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

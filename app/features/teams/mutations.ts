import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supabase-client";
import { z } from "zod";
import type { formSchema } from "./pages/team-submit-page";

export const createTeam = async ({
  client,
  userId,
  teamData,
}: {
  client: SupabaseClient<Database>;
  userId: string;
  teamData: z.infer<typeof formSchema>;
}) => {
  const { data, error } = await client
    .from("teams")
    .insert({
      team_leader_id: userId,
      product_name: teamData.product_name,
      product_description: teamData.product_description,
      team_size: teamData.team_size,
      roles: teamData.roles,
      equity_split: teamData.equity_split,
    })
    .select("team_id")
    .single();
  if (error) {
    throw error;
  }
  return data;
};

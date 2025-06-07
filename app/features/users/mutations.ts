import type { SupabaseClient } from "@supabase/supabase-js";
import { makeSsrClient, type Database } from "~/supabase-client";

export const updateUser = async (
  client: SupabaseClient<Database>,
  {
    id,
    name,
    role,
    headline,
    bio,
  }: {
    id: string;
    name: string;
    role: "developer" | "designer" | "marketer" | "founder" | "product_manager";
    headline: string;
    bio: string;
  }
) => {
  const { error } = await client
    .from("profiles")
    .update({ name, role, headline, bio })
    .eq("profile_id", id);
  if (error) {
    throw error;
  }
};

export const updateUserAvatar = async (
  client: SupabaseClient<Database>,
  { id, avatar }: { id: string; avatar: string }
) => {
  const { error } = await client.from("profiles").update({ avatar }).eq("profile_id", id);
  if (error) {
    throw error;
  }
};

export const getNotifications = async (
  client: SupabaseClient<Database>,
  { userId }: { userId: string }
) => {
  const { data, error } = await client
    .from("notifications")
    .select(
      `
      notification_id,
      profile:profiles!source_id(
        profile_id,
        avatar,
        name
      ),
      product:products!product_id(
        product_id,
        name
      ),
      post:posts!post_id(
        post_id,
        title
      ),
      type,
      seen,
      created_at`
    )
    .eq("target_id", userId)
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  }
  return data;
};

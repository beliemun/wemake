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

export const seeNotification = async (
  client: SupabaseClient<Database>,
  { notificationId, userId }: { notificationId: number; userId: string }
) => {
  console.log("notificationId", notificationId);
  console.log("userId", userId);
  const { error } = await client
    .from("notifications")
    .update({ seen: true })
    .eq("notification_id", notificationId)
    .eq("target_id", userId);
  if (error) {
    throw error;
  }
};

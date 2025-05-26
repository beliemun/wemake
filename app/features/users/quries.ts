import client from "~/supabase-client";
import { productListSelect } from "../products/queries";

export const getUserProfile = async ({ username }: { username: string }) => {
  const { data, error } = await client
    .from("profiles")
    .select(
      `
        profile_id,
        avatar,
        name,
        username,
        headline,
        bio,
        role,
        stats
    `
    )
    .eq("username", username)
    .single();
  if (error) {
    throw error;
  }
  return data;
};

export const getUserProducts = async ({ username }: { username: string }) => {
  const { data, error } = await client
    .from("products")
    .select(
      `
        ${productListSelect},
        profiles!products_to_profiles!inner(
            profile_id
        )
    `
    )
    .eq("profiles.username", username);
  if (error) {
    throw error;
  }
  return data;
};

export const getUserPosts = async ({ username }: { username: string }) => {
  const { data, error } = await client.from("posts").select("*").eq("username", username);
  if (error) {
    throw error;
  }
  return data;
};

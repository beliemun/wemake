import { redirect } from "react-router";
import { productListSelect } from "../products/queries";
import { makeSsrClient } from "~/supabase-client";

export const getUserById = async ({ id, request }: { id: string; request: Request }) => {
  const { client } = makeSsrClient(request);
  const { data, error } = await client
    .from("profiles")
    .select(
      `
        profile_id,
        avatar,
        name,
        username
    `
    )
    .eq("profile_id", id)
    .single();
  if (error) {
    // console.log("getUserById error:", error);
    // throw error;
    return null;
  }
  return data;
};

export const getUserProfile = async ({
  username,
  request,
}: {
  username: string;
  request: Request;
}) => {
  const { client } = makeSsrClient(request);
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

export const getUserProducts = async ({
  username,
  request,
}: {
  username: string;
  request: Request;
}) => {
  const { client } = makeSsrClient(request);
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

export const getUserPosts = async ({
  username,
  request,
}: {
  username: string;
  request: Request;
}) => {
  const { client } = makeSsrClient(request);
  const { data, error } = await client
    .from("community_post_list_view")
    .select("*")
    .eq("author_username", username);
  if (error) {
    throw error;
  }
  return data;
};

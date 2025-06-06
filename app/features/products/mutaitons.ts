import type { SupabaseClient } from "@supabase/supabase-js";
import { makeSsrClient } from "~/supabase-client";

export const createProductReview = async (
  client: SupabaseClient,
  {
    productId,
    userId,
    review,
    rating,
  }: {
    productId: number;
    userId: string;
    review: string;
    rating: number;
  }
) => {
  const { data, error } = await client
    .from("reviews")
    .insert({ review, rating, product_id: productId, profile_id: userId });
  if (error) {
    throw error;
  }
};

export const createProduct = async (
  client: SupabaseClient,
  {
    name,
    tagline,
    url,
    how_it_works,
    description,
    category,
    icon,
    userId,
  }: {
    name: string;
    tagline: string;
    url: string;
    how_it_works: string;
    description: string;
    category: number;
    icon: string;
    userId: string;
  }
) => {
  const { data, error } = await client
    .from("products")
    .insert({
      name,
      tagline,
      url,
      how_it_works,
      description,
      category_id: category,
      profile_id: userId,
      icon,
    })
    .select("product_id")
    .single();
  if (error) {
    throw error;
  }
  return data;
};

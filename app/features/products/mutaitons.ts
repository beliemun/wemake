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

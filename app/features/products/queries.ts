import type { DateTime } from "luxon";
import client from "~/supabase-client";
import { PAGE_SIZE } from "./constants";

interface Product {
  product_id: number;
  name: string;
  description: string;
  upvotes: number;
  views: number;
  reviews: number;
}

export const getProductsByDateRange = async ({
  startDate,
  endDate,
  limit,
  page = 1,
}: {
  startDate: DateTime;
  endDate: DateTime;
  limit: number;
  page: number;
}) => {
  const { data, error } = await client
    .from("products")
    .select(
      `
      product_id,
      name,
      description,
      upvotes:stats->upvotes::int,
      views:stats->views::int,
      reviews:stats->reviews::int
    `
    )
    .order("stats->upvotes", { ascending: false })
    .gte("created_at", startDate)
    .lte("created_at", endDate)
    .limit(limit)
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  if (error) {
    throw new Error(error.message);
  }

  const processedData = data?.map((item) => ({
    product_id: item.product_id,
    name: item.name,
    description: item.description,
    upvotes: Number(item.upvotes),
    views: Number(item.views),
    reviews: Number(item.reviews),
  })) as Product[];

  return processedData;
};

export const getProductPagesByDateRange = async ({
  startDate,
  endDate,
}: {
  startDate: DateTime;
  endDate: DateTime;
}) => {
  const { error, count } = await client
    .from("products")
    .select(`product_id`, { count: "exact", head: true }) // head: true 옵션을 사용하면 카운트 값만 반환, false 옵션을 사용하면 데이터 반환
    .order("stats->upvotes", { ascending: false })
    .gte("created_at", startDate)
    .lte("created_at", endDate);

  if (error) {
    throw new Error(error.message);
  }

  if (!count) {
    return 1;
  }

  return Math.ceil(count / PAGE_SIZE);
};

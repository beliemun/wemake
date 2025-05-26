import type { DateTime } from "luxon";
import client from "~/supabase-client";
import { PAGE_SIZE } from "./constants";

interface Product {
  product_id: number;
  name: string;
  tagline: string;
  upvotes: number;
  views: number;
  reviews: number;
}

export const productListSelect = `
  product_id,
  name,
  tagline,
  upvotes:stats->upvotes::int,
  views:stats->views::int,
  reviews:stats->reviews::int
`;

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
    .select(productListSelect)
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
    tagline: item.tagline,
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

export const getCategories = async () => {
  const { data, error } = await client.from("categories").select("category_id, name, description");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getCategory = async (categoryId: number) => {
  const { data, error } = await client
    .from("categories")
    .select("category_id, name, description")
    .eq("category_id", categoryId)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getProductsByCategory = async ({
  categoryId,
  page,
}: {
  categoryId: number;
  page: number;
}) => {
  const { data, error } = await client
    .from("products")
    .select(productListSelect)
    .eq("category_id", categoryId)
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  if (error) {
    throw new Error(error.message);
  }

  return data as Product[];
};

export const getCategoryPages = async (categoryId: number) => {
  const { error, count } = await client
    .from("products")
    .select(`product_id`, { count: "exact", head: true })
    .eq("category_id", categoryId);

  if (error) {
    throw new Error(error.message);
  }

  if (!count) {
    return 1;
  }

  return Math.ceil(count / PAGE_SIZE);
};

export const getProductBySearch = async ({ query, page }: { query: string; page: number }) => {
  const { data, error } = await client
    .from("products")
    .select(productListSelect)
    .or(`name.ilike.%${query}%,tagline.ilike.%${query}%`)
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  if (error) {
    throw new Error(error.message);
  }

  return data as Product[];
};

export const getPagesBySearch = async ({ query }: { query: string }) => {
  const { error, count } = await client
    .from("products")
    .select(`product_id`, { count: "exact", head: true })
    .or(`name.ilike.%${query}%,tagline.ilike.%${query}%`);

  if (error) {
    throw new Error(error.message);
  }

  if (!count) {
    return 1;
  }

  return Math.ceil(count / PAGE_SIZE);
};

// view에서 select된 데이터는 모두 Nullable로 반환되기 때문에 supabase-client.ts 에서 type-fest를 이용해 SetNonNullable 처리
export const getProductById = async (productId: number) => {
  const { data, error } = await client
    .from("product_overview_view")
    .select("*")
    .eq("product_id", productId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getReviewsByProductId = async (productId: number) => {
  const { data, error } = await client
    .from("reviews")
    .select(
      `
    review_id,
    rating,
    review,
    created_at,
    user:profiles(
      name,
      username,
      avatar
    )
    `
    )
    .eq("product_id", productId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

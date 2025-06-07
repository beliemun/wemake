import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supabase-client";

export const createPost = async (
  client: SupabaseClient<Database>,
  {
    title,
    content,
    category,
    userId,
  }: { title: string; content: string; category: string; userId: string }
) => {
  const { data: categoryData, error: categoryError } = await client
    .from("topics")
    .select("topic_id")
    .eq("slug", category)
    .single();
  if (categoryError) {
    throw categoryError;
  }

  const { data, error } = await client
    .from("posts")
    .insert({
      title,
      content,
      profile_id: userId,
      topic_id: categoryData.topic_id,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
};

export const createReply = async (
  client: SupabaseClient<Database>,
  {
    reply,
    postId,
    userId,
    parentId,
  }: { reply: string; postId: number; userId: string; parentId?: number }
) => {
  const { data, error } = await client
    .from("post_replies")
    .insert({
      ...(parentId ? { parent_id: parentId } : { post_id: postId }),
      reply,
      profile_id: userId,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
};

export const toggleUpvote = async (
  client: SupabaseClient<Database>,
  { postId, userId }: { postId: number; userId: string }
) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const { count } = await client
    .from("post_upvotes")
    .select("count", { count: "exact", head: true }) // head: true 옵션을 사용하면 데이터 없이 count만 전달 받음
    .eq("post_id", postId)
    .eq("profile_id", userId);
  if (count === 0) {
    await client.from("post_upvotes").insert({ post_id: postId, profile_id: userId });
  } else {
    await client.from("post_upvotes").delete().eq("post_id", postId).eq("profile_id", userId);
  }
};

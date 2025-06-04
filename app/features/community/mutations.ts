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
  console.log(1, reply, postId, parentId);
  const { data, error } = await client
    .from("post_replies")
    .insert({
      ...(parentId ? { parent_id: parentId } : { post_id: postId }),
      reply,
      profile_id: userId,
    })
    .select()
    .single();
  console.log(2, data);
  if (error) {
    throw error;
  }
  return data;
};

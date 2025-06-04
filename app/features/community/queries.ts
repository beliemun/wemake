import { DateTime } from "luxon";
import type { Database } from "~/supabase-client";
import type { SupabaseClient } from "@supabase/supabase-js";

// export const getTopics = async () => {
//   const allTopics = await db
//     .select({
//       name: topics.name,
//       slug: topics.slug,
//     })
//     .from(topics);

//   return allTopics;
// };

export const getTopics = async (client: SupabaseClient<Database>) => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const { data, error } = await client.from("topics").select("name, slug");
  if (error) {
    // 여기서 Throw 된 에러는 Error Boundary 에서 잡히게 된다.
    throw new Error(error.message);
  }
  return data;
};

// export const getPosts = async () => {
//   const allPosts = await db
//     .select({
//       id: posts.post_id,
//       title: posts.title,
//       content: posts.content,
//       createdAt: posts.created_at,
//       author: profiles.name,
//       avatar: profiles.avatar,
//       username: profiles.username,
//       upvotes: count(postUpvotes.post_id),
//     })
//     .from(posts)
//     .innerJoin(topics, eq(posts.topic_id, topics.topic_id))
//     .innerJoin(profiles, eq(posts.profile_id, profiles.profile_id))
//     .leftJoin(postUpvotes, eq(posts.post_id, postUpvotes.post_id))
//     .groupBy(posts.post_id, topics.name, profiles.name, profiles.avatar, profiles.username)
//     .orderBy(asc(posts.post_id));
//   return allPosts;
// };

export const getPosts = async (
  client: SupabaseClient<Database>,
  {
    limit,
    sorting,
    period,
    search,
    topic,
  }: {
    limit: number;
    sorting: "newest" | "popular";
    period: "all" | "today" | "week" | "month" | "year";
    search?: string;
    topic?: string;
  }
) => {
  // 괄호'()'를 활용하면 해당 테이블 중 원하는 컬럼만 가져올 수 있다.
  // supabase 에서는 기본적으로 left join 을 사용한다. 따라서 조인되지 않은 데이터는 null 로 표시된다.
  // inner join 을 사용하려면 컬럼명 다음에 !inner 를 붙이면 된다.
  const baseQuery = client.from("community_post_list_view").select("*").limit(limit);
  if (sorting === "newest") {
    baseQuery.order("created_at", { ascending: false });
  } else if (sorting === "popular") {
    if (period === "all") {
      baseQuery.order("upvotes", { ascending: false });
    } else {
      const today = DateTime.now();
      if (period === "today") {
        baseQuery.gte("created_at", today.startOf("day").toISO());
      } else if (period === "week") {
        baseQuery.gte("created_at", today.startOf("week").toISO());
      } else if (period === "month") {
        baseQuery.gte("created_at", today.startOf("month").toISO());
      } else if (period === "year") {
        baseQuery.gte("created_at", today.startOf("year").toISO());
      }
      baseQuery.order("upvotes", { ascending: false });
    }
  }

  if (search) {
    baseQuery.ilike("title", `%${search}%`);
  }

  if (topic) {
    baseQuery.eq("topic_slug", topic);
  }

  const { data, error, status, statusText } = await baseQuery;
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getPostById = async (client: SupabaseClient<Database>, postId: number) => {
  const { data, error } = await client
    .from("community_post_detail")
    .select("*")
    .eq("post_id", postId)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getReplies = async (client: SupabaseClient<Database>, postId: number) => {
  const replyQuery = `
    reply_id,
    reply,
    parent_id,
    created_at,
    user:profiles(
      name,
      avatar,
      username
    )
  `;

  const { data, error } = await client
    .from("post_replies")
    .select(
      `
        ${replyQuery},
        post_replies (
          ${replyQuery}
        )
      `
    )
    .eq("post_id", postId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

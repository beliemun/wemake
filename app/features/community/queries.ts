import db from "~/db";
import { posts, postUpvotes, topics } from "./schema";
import { count, asc, eq } from "drizzle-orm";
import { profiles } from "../users/schema";
import client from "~/supabase-client";

// export const getTopics = async () => {
//   const allTopics = await db
//     .select({
//       name: topics.name,
//       slug: topics.slug,
//     })
//     .from(topics);

//   return allTopics;
// };

export const getTopics = async () => {
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

export const getPosts = async () => {
  // 괄호'()'를 활용하면 해당 테이블 중 원하는 컬럼만 가져올 수 있다.
  // supabase 에서는 기본적으로 left join 을 사용한다. 따라서 조인되지 않은 데이터는 null 로 표시된다.
  // inner join 을 사용하려면 컬럼명 다음에 !inner 를 붙이면 된다.
  const { data, error } = await client.from("community_post_list_view").select("*");

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

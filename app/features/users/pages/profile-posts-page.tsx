import { PostCard } from "~/features/posts/components/post-card";
import type { Route } from "./+types/profile-posts-page";
import { getUserPosts } from "../queries";
import { makeSsrClient } from "~/supabase-client";

export const meta: Route.MetaFunction = () => {
  return [{ title: "포스트 | WeMake" }];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { username } = params;
  const { client } = makeSsrClient(request);
  const posts = await getUserPosts(client, { username: username as string });
  return { posts };
};

export default function ProfilePostsPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4">
        {loaderData.posts.map((post) => (
          <PostCard
            postId={post.post_id}
            key={post.post_id}
            title={post.title}
            content={post.content}
            author={post.author_username}
            date={post.created_at}
            avatar={post.author_avatar}
          />
        ))}
      </div>
    </div>
  );
}

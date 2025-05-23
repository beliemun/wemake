import { PostCard } from "~/features/posts/components/post-card";
import type { Route } from "./+types/profile-posts-page";

interface Post {
  id: string;
  title: string;
  content: string;
}

export const meta: Route.MetaFunction = () => {
  return [{ title: "포스트 | WeMake" }];
};

export default function ProfilePostsPage() {
  const username = "사용자"; // TODO: 실제 사용자 이름을 가져오도록 구현

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">{username}의 포스트</h1>
      <div className="grid grid-cols-1 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <PostCard
            postId={index}
            key={index}
            title="포스트 제목"
            content="포스트 내용"
            author="사용자"
            date="2024-01-01"
            avatar="https://github.com/shadcn.png"
          />
        ))}
      </div>
    </div>
  );
}

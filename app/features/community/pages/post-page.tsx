import type { Route } from "./+types/post-page";

export const meta: Route.MetaFunction = () => [
  { title: "게시글 | WeMake" },
  { name: "description", content: "WeMake 커뮤니티 게시글을 확인해보세요." },
];

export default function PostPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">게시글</h1>
    </div>
  );
}

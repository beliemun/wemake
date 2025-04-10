import type { Route } from "./+types/post-submit-page";

export const meta: Route.MetaFunction = () => [
  { title: "게시글 작성 | WeMake" },
  { name: "description", content: "WeMake 커뮤니티에 새로운 게시글을 작성해보세요." },
];

export default function PostSubmitPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">게시글 작성</h1>
    </div>
  );
}

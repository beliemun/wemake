import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/post-submit-page";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Textarea } from "~/common/components/ui/textarea";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => [
  { title: "게시글 작성 | WeMake" },
  { name: "description", content: "WeMake 커뮤니티에 새로운 게시글을 작성해보세요." },
];

export default function PostSubmitPage() {
  return (
    <div>
      <Hero title="게시글 작성" description="WeMake 커뮤니티에 새로운 게시글을 작성해보세요." />
      <div className="p-8">
        <Form className="flex flex-col max-w-screen-sm mx-auto gap-6">
          <InputPair
            id="title"
            label="제목"
            placeholder="제목을 입력해주세요."
            description="제목을 입력해주세요."
          />
          <SelectPair
            name="category"
            label="카테고리"
            placeholder="카테고리를 선택해주세요."
            description="카테고리를 선택해주세요."
            options={[
              { value: "productivity", label: "Productivity" },
              { value: "design", label: "Design" },
              { value: "development", label: "Development" },
              { value: "marketing", label: "Marketing" },
              { value: "sales", label: "Sales" },
            ]}
          />
          <InputPair
            id="content"
            name="content"
            label="내용"
            required
            placeholder="내용을 입력해주세요."
            description="내용을 입력해주세요."
            textArea
          />
          <Button type="submit">게시글 작성</Button>
        </Form>
      </div>
    </div>
  );
}

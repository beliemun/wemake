import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/post-submit-page";
import { Form, redirect, useNavigation } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";
import { getSignedInUserId } from "~/features/users/quries";
import { getTopics } from "~/features/community/queries";
import { makeSsrClient } from "~/supabase-client";
import { z } from "zod";
import { createPost } from "../mutations";
import { Loader2 } from "lucide-react";

export const meta: Route.MetaFunction = () => [
  { title: "게시글 작성 | WeMake" },
  { name: "description", content: "WeMake 커뮤니티에 새로운 게시글을 작성해보세요." },
];

const formSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  category: z.string().min(1),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSsrClient(request);
  const userId = await getSignedInUserId(client);
  const formData = await request.formData();

  // parse는 에러를 던지고, safeParse는 성공여부를 반환한다.
  const { success, data, error } = formSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return { fieldErrors: error.flatten().fieldErrors };
  }
  const { title, content, category } = data;
  const { post_id } = await createPost(client, { title, content, category, userId });

  return redirect(`/community/${post_id}`);
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSsrClient(request);
  const userId = await getSignedInUserId(client);
  const topics = await getTopics(client);
  return { userId, topics };
};

export default function PostSubmitPage({ loaderData, actionData }: Route.ComponentProps) {
  const { state } = useNavigation();
  return (
    <div>
      <Hero title="게시글 작성" description="WeMake 커뮤니티에 새로운 게시글을 작성해보세요." />
      <div className="p-8">
        <Form className="flex flex-col max-w-screen-sm mx-auto gap-6" method="post">
          <InputPair
            id="title"
            label="제목"
            name="title"
            placeholder="제목을 입력해주세요."
            description="제목을 입력해주세요."
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.title?.join(", ")}</p>
          )}
          <SelectPair
            name="category"
            label="카테고리"
            placeholder="카테고리를 선택해주세요."
            description="카테고리를 선택해주세요."
            options={loaderData.topics.map((topic) => ({
              label: topic.name,
              value: topic.slug,
            }))}
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.category?.join(", ")}</p>
          )}
          <InputPair
            id="content"
            name="content"
            label="내용"
            required
            placeholder="내용을 입력해주세요."
            description="내용을 입력해주세요."
            textArea
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.content?.join(", ")}</p>
          )}
          <Button className="cursor-pointer" type="submit" disabled={state === "submitting"}>
            {state === "submitting" ? <Loader2 className="h-4 w-4 animate-spin" /> : "게시글 작성"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

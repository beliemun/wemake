import { Form, Link, redirect, useOutletContext } from "react-router";
import type { Route } from "./+types/post-page";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/common/components/ui/breadcrumb";
import { ChevronUp, DotIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Reply } from "../components/reply";
import { getPostById, getReplies } from "../queries";
import { DateTime } from "luxon";
import { makeSsrClient } from "~/supabase-client";
import { Textarea } from "~/common/components/ui/textarea";
import { z } from "zod";
import { createReply } from "../mutations";
import { getSignedInUserId } from "~/features/users/quries";
import { useEffect, useRef } from "react";

export const meta: Route.MetaFunction = () => [
  { title: "게시글 | WeMake" },
  { name: "description", content: "WeMake 커뮤니티 게시글을 확인해보세요." },
];

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client } = makeSsrClient(request);
  const post = await getPostById(client, Number(params.postId));
  const replies = await getReplies(client, Number(params.postId));
  return { post, replies };
};

const formSchema = z.object({
  reply: z.string().min(1, "댓글을 입력해주세요."),
  parent_id: z.coerce.number().optional(),
});

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSsrClient(request);
  const formData = await request.formData();
  const userId = await getSignedInUserId(client);
  const { success, data, error } = formSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return { fieldErrors: error.flatten().fieldErrors };
  }
  const { reply, parent_id } = data;
  await createReply(client, {
    reply,
    postId: Number(params.postId),
    userId,
    parentId: parent_id,
  });
  return { success: true };
};

export default function PostPage({ loaderData, actionData }: Route.ComponentProps) {
  const { isSignedIn, name, username, avatar } = useOutletContext<{
    isSignedIn: boolean;
    name?: string;
    username?: string;
    avatar?: string;
  }>();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (actionData?.success) {
      formRef.current?.reset();
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [actionData, formRef]);

  return (
    <main className="flex flex-col gap-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/community">커뮤니티</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/community?topic=${loaderData.post.topic_slug}`}>
                {loaderData.post.topic_name}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/community/${loaderData.post.post_id}`}>{loaderData.post.title}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-6 gap-10 items-start">
        <div className="flex flex-col col-span-4 gap-4">
          <div className="flex w-full items-start gap-10">
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center cursor-pointer h-14"
            >
              <ChevronUp className="w-4 h-4 text-foreground" />
              <span className="text-sm text-foreground">{loaderData.post.upvotes}</span>
            </Button>
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-bold text-foreground">{loaderData.post.title}</h2>
              <div>
                <div className="flex items-center">
                  <p className="text-sm text-muted-foreground">
                    Posted by <Link to="/user/1">@{loaderData.post.author_name}</Link>
                  </p>
                  <DotIcon className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {DateTime.fromISO(loaderData.post.created_at).toRelative()}
                  </p>
                  <DotIcon className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {loaderData.post.reply_count} Replies
                  </p>
                </div>
                <p className="text-sm text-muted-foreground mt-6">{loaderData.post.content}</p>
              </div>
              <div className="w-xl">
                {isSignedIn ? (
                  <Form ref={formRef} className="flex gap-6" method="post">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>{loaderData.post.author_name.slice(0, 2)}</AvatarFallback>
                      <AvatarImage src={loaderData.post.author_avatar} />
                    </Avatar>
                    <div className="flex flex-col items-end gap-6 w-full">
                      <Textarea
                        name="reply"
                        className="w-full resize-none"
                        placeholder="댓글을 입력해주세요."
                        rows={4}
                      />
                      <Button type="submit" className="cursor-pointer">
                        댓글 작성
                      </Button>
                    </div>
                  </Form>
                ) : null}
                <div className="flex flex-col gap-4">
                  <h4 className="text-sm font-bold text-muted-foreground">
                    {loaderData.post.reply_count} Replies
                  </h4>
                  {Array.from({ length: loaderData.post.reply_count }).map((_, index) => (
                    <Reply
                      key={index}
                      name={loaderData.replies[index].user?.name}
                      authorName={loaderData.post.author_name}
                      authorAvatar={loaderData.post.author_avatar}
                      timestamp={DateTime.fromISO(loaderData.post.created_at).toRelative()}
                      content={loaderData.replies[index].reply}
                      topLevel={true}
                      parentId={loaderData.replies[index].reply_id}
                      replies={loaderData.replies[index].post_replies.map((reply) => ({
                        ...reply,
                        user: reply.user as { name: string; avatar: string; username: string },
                      }))}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className="sticky top-16 col-span-2 border border-foreground rounded-lg p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="w-10 h-10">
                <AvatarFallback>CN</AvatarFallback>
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-bold text-foreground">{loaderData.post.author_name}</p>
                <Badge variant="secondary">
                  <span className="text-xs">{loaderData.post.author_role}</span>
                </Badge>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs text-muted-foreground">
                🎂 Joined {DateTime.fromISO(loaderData.post.author_created_at).toRelative()}
              </p>
              <p className="text-xs text-muted-foreground">
                🚀 Launched {loaderData.post.products} products
              </p>
            </div>
            <Button variant="outline" className="w-full cursor-pointer">
              Follow
            </Button>
          </div>
        </aside>
      </div>
    </main>
  );
}

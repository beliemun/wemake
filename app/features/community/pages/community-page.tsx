import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/community-page";
import { Button } from "~/common/components/ui/button";
import { Form, Link, useSearchParams, useNavigate, Await, data } from "react-router";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "~/common/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { SORT_OPTIONS, PERIOD_OPTIONS } from "../constants";
import { Input } from "~/common/components/ui/input";
import { PostCard } from "~/features/posts/components/post-card";
import { getPosts, getTopics } from "../queries";
import { Suspense } from "react";
import { z } from "zod";
import { makeSsrClient } from "~/supabase-client";

export const meta: Route.MetaFunction = () => [
  { title: "커뮤니티 | WeMake" },
  { name: "description", content: "WeMake 커뮤니티에서 다양한 이야기를 나눠보세요." },
];

const searchParamsSchema = z.object({
  sorting: z.enum(["newest", "popular"]).optional().default("newest"),
  period: z.enum(["all", "today", "week", "month", "year"]).optional().default("all"),
  search: z.string().optional(),
  topic: z.string().optional(),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSsrClient(request);
  const url = new URL(request.url);
  const { success, data: parsedData } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );
  if (!success) {
    throw data(
      {
        error: "Invalid search params",
        message: "Invalid search params",
      },
      { status: 400 }
    );
  }

  // await new Promise((resolve) => setTimeout(resolve, 2000));
  // const topics = await getTopics();
  // const posts = await getPosts();
  // const [topics, posts] = await Promise.all([getTopics(), getPosts()]);
  const topics = getTopics(client);
  const posts = getPosts(client, {
    limit: 10,
    sorting: parsedData.sorting,
    period: parsedData.period,
    search: parsedData.search,
    topic: parsedData.topic,
  });
  return { topics, posts };
};

export const clientLoader = async ({ serverLoader }: Route.ClientLoaderArgs) => {
  const { topics, posts } = await serverLoader();
  return { topics, posts };
};

export default function CommunityPage({ loaderData }: Route.ComponentProps) {
  const { topics, posts } = loaderData;
  const [searchParams, setSearchParams] = useSearchParams();
  const sorting = searchParams.get("sorting") || "newest";
  const period = searchParams.get("period") || "all";
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8">
      <Hero title="커뮤니티" description="WeMake 커뮤니티에서 다양한 이야기를 나눠보세요." />
      <div className="grid grid-cols-5 items-start gap-20">
        <div className="col-span-4 flex flex-col justify-between gap-4">
          <div className="flex flex-row w-full gap-4">
            <div className="flex flex-col w-full gap-4 ">
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                      <span className="text-sm text-muted-foreground capitalize">{sorting}</span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {SORT_OPTIONS.map((option) => (
                      <DropdownMenuCheckboxItem
                        className="capitalize cursor-pointer"
                        key={option}
                        onCheckedChange={() => {
                          searchParams.set("sorting", option);
                          setSearchParams(searchParams);
                        }}
                      >
                        {option}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {sorting === "popular" ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost">
                        <span className="text-sm text-muted-foreground capitalize">{period}</span>
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {PERIOD_OPTIONS.map((option) => (
                        <DropdownMenuCheckboxItem
                          className="capitalize cursor-pointer"
                          key={option}
                          onCheckedChange={() => {
                            searchParams.set("period", option);
                            setSearchParams(searchParams);
                          }}
                        >
                          {option}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : null}
              </div>
              <Form className="flex items-center gap-2">
                <Input className="w-fit" name="search" placeholder="검색어를 입력해주세요." />
              </Form>
            </div>
            <Button className="cursor-pointer" onClick={() => navigate("/community/submit")}>
              게시글 작성
            </Button>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <Await resolve={posts}>
              {(data) => (
                <div className="flex flex-col gap-4">
                  {data.map((post, index) => (
                    <PostCard
                      postId={post.post_id}
                      key={index}
                      title={post.title}
                      content={post.content}
                      author={post.author}
                      date={post.created_at}
                      votesCount={post.upvotes}
                      avatar={post.author_avatar}
                      expanded={true}
                      isUpvoted={post.is_upvoted}
                    />
                  ))}
                </div>
              )}
            </Await>
          </Suspense>
        </div>
        <div className="sticky top-16">
          <p className="text-sm text-muted-foreground mb-4">Topics</p>
          <Suspense fallback={<div>Loading...</div>}>
            <Await resolve={topics}>
              {(data) => (
                <div className="flex flex-col gap-2 items-start">
                  {data.map((topic, index) => (
                    <Button asChild key={index} variant="ghost">
                      <Link to={`/community?topic=${topic.slug}`}>{topic.name}</Link>
                    </Button>
                  ))}
                </div>
              )}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export function ErrorBoundary() {
  return <div>Error</div>;
}

import { Form, Link } from "react-router";
import type { Route } from "./+types/post-page";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/common/components/ui/breadcrumb";
import { CakeIcon, ChevronUp, DotIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";
import { Textarea } from "~/common/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { IoChatbubbleOutline } from "react-icons/io5";
import { Reply } from "../components/comment";

export const meta: Route.MetaFunction = () => [
  { title: "게시글 | WeMake" },
  { name: "description", content: "WeMake 커뮤니티 게시글을 확인해보세요." },
];

export default function PostPage() {
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
              <Link to="/community/post">게시글</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/community/post">What is the best productivity tool?</Link>
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
              <span className="text-sm text-foreground">10</span>
            </Button>
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-bold text-foreground">
                What is the best productivity tool?
              </h2>
              <div>
                <div className="flex items-center">
                  <p className="text-sm text-muted-foreground">
                    Posted by <Link to="/user/1">@brain</Link>
                  </p>
                  <DotIcon className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">12 hours ago</p>
                  <DotIcon className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">10 Replies</p>
                </div>
                <p className="text-sm text-muted-foreground mt-6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit
                  amet consectetur adipisicing elit. Quisquam, quos.
                </p>
              </div>
              <div>
                <Form className="flex gap-6">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback>CN</AvatarFallback>
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  <div className="flex flex-col items-end gap-6 w-full">
                    <Textarea
                      placeholder="댓글을 입력해주세요."
                      rows={4}
                      className="w-full resize-none"
                    />
                    <Button type="submit" className="cursor-pointer">
                      댓글 작성
                    </Button>
                  </div>
                </Form>
                <div className="flex flex-col gap-4">
                  <h4 className="text-sm font-bold text-muted-foreground">10 Replies</h4>
                  {Array.from({ length: 10 }).map((_, index) => (
                    <Reply
                      key={index}
                      authorName="John Doe"
                      authorAvatar="https://github.com/shadcn.png"
                      timestamp="12 hours ago"
                      content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
                      topLevel={true}
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
                <p className="text-sm font-bold text-foreground">John Doe</p>
                <Badge variant="secondary">
                  <span className="text-xs">Enterpreneur</span>
                </Badge>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs text-muted-foreground">🎂 Joined 3 months ago</p>
              <p className="text-xs text-muted-foreground">🚀 Launched 100+ products</p>
            </div>
            <Button variant="outline" className="w-full">
              Follow
            </Button>
          </div>
        </aside>
      </div>
    </main>
  );
}

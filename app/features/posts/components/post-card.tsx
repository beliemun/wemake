import { ChevronUp } from "lucide-react";
import { DateTime } from "luxon";
import { Link, useFetcher } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { Card, CardHeader, CardTitle, CardFooter } from "~/common/components/ui/card";
import { cn } from "~/lib/utils";

interface PostCardProps {
  title: string;
  content: string;
  author: string;
  date: string;
  postId: number;
  expanded?: boolean;
  votesCount?: number;
  avatar: string | null;
  isUpvoted: boolean;
}

export function PostCard({
  title,
  content,
  author,
  date,
  postId,
  expanded = false,
  votesCount = 0,
  avatar,
  isUpvoted,
}: PostCardProps) {
  const fetcher = useFetcher();
  // fetcher.state가 idle이면 원래 값을 사용하고,
  // 그렇지 않다는 것은 update 중이라는 것을 뜻하기 때문에 현재의 isUpvoted 상태에 따라 결과 값을 미리 계산한다.
  const optimisticVotesCount =
    fetcher.state === "idle" ? votesCount : isUpvoted ? votesCount - 1 : votesCount + 1;
  const optimisticIsUpvoted = fetcher.state === "idle" ? isUpvoted : isUpvoted ? false : true;
  const absordClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // 컴포넌트로 postId를 전달하기 위해서는 숨겨진 Input을 만들고 value를 전달해야 하는데 반면,
    // Programmatically 하게 전달할 때에는 FormData를 직접 전달한다.
    fetcher.submit({ postId }, { method: "POST", action: `/community/${postId}/upvote` });
  };
  return (
    <Link to={`/community/${postId}`}>
      <Card>
        <CardHeader className="flex flex-row gap-2">
          <Avatar>
            <AvatarImage src={avatar ?? undefined} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">{author}</p>
              <p className="text-sm text-muted-foreground">{content.slice(0, 100)}...</p>
              <p className="text-sm text-muted-foreground">{DateTime.fromISO(date).toRelative()}</p>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="flex justify-end ">
          {expanded ? (
            <Button
              onClick={absordClick}
              variant="default"
              className={cn(
                "flex justify-end cursor-pointer",
                optimisticIsUpvoted
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent text-foreground"
              )}
            >
              <ChevronUp className="w-4 h-4 text-foreground" />
              <span className="text-sm text-foreground">{optimisticVotesCount}</span>
            </Button>
          ) : (
            <Button asChild>View post &rarr;</Button>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}

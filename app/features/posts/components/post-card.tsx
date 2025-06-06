import { ChevronUp } from "lucide-react";
import { DateTime } from "luxon";
import { Link } from "react-router";
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
  console.log("isUpvoted", isUpvoted);
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
              variant="default"
              className={cn(
                "flex justify-end",
                isUpvoted
                  ? "bg-primary text-primary-foreground pointer-events-none"
                  : "bg-transparent text-foreground cursor-pointer"
              )}
            >
              <ChevronUp className="w-4 h-4 text-foreground" />
              <span className="text-sm text-foreground">{votesCount}</span>
            </Button>
          ) : (
            <Button asChild>View post &rarr;</Button>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}

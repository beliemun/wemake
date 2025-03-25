import { Link } from "react-router";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { EyeIcon, DotIcon, HeartIcon, LockIcon } from "lucide-react";
import { cn } from "~/lib/utils";

interface IdeaCardProps {
  content: string;
  viewCount: number;
  date: string;
  likeCount: number;
  ideaId: string;
  claimed?: boolean;
}

export function IdeaCard({ content, viewCount, date, likeCount, ideaId, claimed }: IdeaCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          <span className={cn({ "bg-foreground selection:bg-foreground": claimed })}>
            {content}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row items-center gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <EyeIcon className="size-4" />
          <span>{viewCount}</span>
        </div>
        <DotIcon className="size-4" />
        <span>{date}</span>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button className="cursor-pointer" variant="ghost">
          <HeartIcon className="size-4" />
          <span>{likeCount}</span>
        </Button>
        {claimed ? (
          <Button disabled variant="outline" className="cursor-not-allowed">
            <LockIcon className="size-4" />
            Claimed
          </Button>
        ) : (
          <Button className="cursor-pointer" variant="default">
            <Link to={`/ideas/${ideaId}`}>Claim idea now &rarr;</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

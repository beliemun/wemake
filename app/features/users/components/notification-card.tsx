import { Card, CardContent, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { EyeIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { DateTime } from "luxon";
import { useFetcher, useParams } from "react-router";
interface NotificationCardProps {
  notificationId: number;
  avatarUrl: string;
  avatarFallback: string;
  username: string;
  timeAgo: string;
  seen: boolean;
  type: string;
  productName: string;
  postTitle: string;
}

export function NotificationCard({
  notificationId,
  avatarUrl,
  avatarFallback,
  username,
  timeAgo,
  seen,
  type,
  productName,
  postTitle,
}: NotificationCardProps) {
  const fetcher = useFetcher();
  const optimisticSeen = fetcher.state === "idle" ? seen : true;
  return (
    <Card className={cn("flex flex-col gap-4", { "bg-muted": !optimisticSeen })}>
      <CardHeader className="flex flex-row gap-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <CardTitle className="flex gap-1 font-bold">
            <span className="cursor-pointer hover:underline">{username}</span>
            <span className="text-muted-foreground">
              {type === "follow"
                ? "followed you"
                : type === "review"
                ? `reviewed your product "${productName}"`
                : type === "reply"
                ? `replied to your post "${postTitle}"`
                : "mentioned you"}
            </span>
          </CardTitle>
          <small className="text-muted-foreground text-sm">
            {DateTime.fromISO(timeAgo).toRelative()}
          </small>
        </div>
      </CardHeader>
      <CardContent className="flex justify-end">
        <fetcher.Form method="post" action={`/my/notifications/${notificationId}/seen`}>
          <Button
            className="cursor-pointer"
            variant="outline"
            size="icon"
            disabled={optimisticSeen}
          >
            <EyeIcon className="w-4 h-4" />
          </Button>
        </fetcher.Form>
      </CardContent>
    </Card>
  );
}

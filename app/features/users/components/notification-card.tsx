import { Card, CardContent, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { EyeIcon } from "lucide-react";
import { cn } from "~/lib/utils";
interface NotificationCardProps {
  avatarUrl: string;
  avatarFallback: string;
  username: string;
  action: string;
  timeAgo: string;
  seen: boolean;
}

export function NotificationCard({
  avatarUrl,
  avatarFallback,
  username,
  action,
  timeAgo,
  seen,
}: NotificationCardProps) {
  return (
    <Card className={cn("flex flex-col gap-4", { "bg-muted": !seen })}>
      <CardHeader className="flex flex-row gap-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <CardTitle className="flex gap-1 font-bold">
            <span>{username}</span>
            <span>{action}</span>
          </CardTitle>
          <small className="text-muted-foreground text-sm">{timeAgo}</small>
        </div>
      </CardHeader>
      <CardContent className="flex justify-end">
        <Button className="cursor-pointer" variant="outline" size="icon">
          <EyeIcon className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );
}

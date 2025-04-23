import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { cn } from "~/lib/utils";
interface MessageBubbleProps {
  avatar: string;
  name: string;
  message: string;
  isCurrentUser: boolean;
}

export function MessageBubble({ avatar, name, message, isCurrentUser }: MessageBubbleProps) {
  return (
    <div className={cn("flex items-center gap-4", isCurrentUser ? "justify-end" : "justify-start")}>
      {!isCurrentUser && (
        <Avatar className="size-12">
          <AvatarImage src={avatar} />
          <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "rounded-md p-4 max-w-[40%] ",
          isCurrentUser
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-accent text-foreground rounded-bl-none"
        )}
      >
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
}

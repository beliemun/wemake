import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";

interface ReviewCardProps {
  username: string;
  userHandle: string;
  userAvatar?: string;
  userInitial: string;
  rating: number;
  content: string;
}

export function ReviewCard({
  username,
  userHandle,
  userAvatar,
  userInitial,
  rating,
  content,
}: ReviewCardProps) {
  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-row gap-2">
        <Avatar className="size-12">
          <AvatarFallback>{userInitial}</AvatarFallback>
          {userAvatar && <AvatarImage src={userAvatar} />}
        </Avatar>
        <div>
          <h3 className="text-foreground font-bold">{username}</h3>
          <p className="text-sm text-muted-foreground">@{userHandle}</p>
        </div>
      </header>
      <div className="flex flex-row gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <StarIcon
            key={index}
            className={`size-4 ${index < rating ? "text-yellow-500" : "text-muted"}`}
            fill={index < rating ? "currentColor" : "none"}
          />
        ))}
      </div>
      <p className="text-sm text-muted-foreground">{content}</p>
    </div>
  );
}

import { StarIcon } from "lucide-react";
import { DateTime } from "luxon";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";

interface ReviewCardProps {
  name: string;
  userName: string;
  avatar?: string | null;
  initial: string;
  rating: number;
  content: string;
  created_at: string;
}

export function ReviewCard({
  name,
  userName,
  avatar,
  initial,
  rating,
  content,
  created_at,
}: ReviewCardProps) {
  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-row gap-2">
        <Avatar className="size-12">
          <AvatarFallback>{initial}</AvatarFallback>
          {avatar && <AvatarImage src={avatar} />}
        </Avatar>
        <div>
          <h3 className="text-foreground font-bold">{name}</h3>
          <p className="text-sm text-muted-foreground">@{userName}</p>
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
      <p className="text-sm text-muted-foreground">{DateTime.fromISO(created_at).toRelative()}</p>
    </div>
  );
}

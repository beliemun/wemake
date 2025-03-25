import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { Card, CardHeader, CardTitle, CardFooter } from "~/common/components/ui/card";

interface PostCardProps {
  title: string;
  description: string;
  author: string;
  date: string;
  postId: string;
}

export function PostCard({ title, description, author, date, postId }: PostCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">{author}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
            <p className="text-sm text-muted-foreground">{date}</p>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <Button asChild>
          <Link to={`/community/${postId}`}>View post &rarr;</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

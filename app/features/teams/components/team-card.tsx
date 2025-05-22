import { Link } from "react-router";
import { Card, CardHeader, CardFooter, CardTitle } from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { Badge } from "~/common/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";

interface TeamCardProps {
  username: string;
  avatar: string | null;
  userInitial: string;
  position: string[];
  description: string;
  teamId: string;
}

export function TeamCard({
  username,
  avatar,
  userInitial,
  position,
  description,
  teamId,
}: TeamCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <CardTitle className="flex flex-wrap items-center gap-1">
          <Badge variant="secondary" className="inline-flex items-center gap-2">
            <span className="text-sm">@{username}</span>
            <Avatar className="size-4">
              <AvatarFallback>{userInitial}</AvatarFallback>
              <AvatarImage src={avatar ?? undefined} />
            </Avatar>
          </Badge>
          <span className="text-sm"> is looking for</span>
          {position.map((role, index) => (
            <Badge key={index} variant="default" className="inline-flex items-center gap-2 text-sm">
              {role}
            </Badge>
          ))}
          <span className="text-sm whitespace-pre-wrap">{description}</span>
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex flex-row items-center justify-end gap-2">
        <Button variant="default" className="flex flex-row items-center gap-2" asChild>
          <Link to={`/teams/${teamId}`}>Join &rarr;</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

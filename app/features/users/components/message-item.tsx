import { Link, useLocation } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { SidebarMenuItem, SidebarMenuButton } from "~/common/components/ui/sidebar";

interface MessageItemProps {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
}

export function MessageItem({ name, avatar, lastMessage, id }: MessageItemProps) {
  const location = useLocation();
  const isActive = location.pathname.includes(`/my/messages/${id}`);
  return (
    <SidebarMenuItem>
      <SidebarMenuButton className="h-16 cursor-pointer" isActive={isActive} asChild>
        <Link to={`/my/messages/${id}`}>
          <div className="flex items-center gap-2">
            <Avatar className="size-8">
              <AvatarImage src={avatar} />
              <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-medium">{name}</p>
              <p className="text-xs text-muted-foreground">{lastMessage}</p>
            </div>
          </div>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

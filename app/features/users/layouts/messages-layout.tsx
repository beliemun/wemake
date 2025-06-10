import { Outlet } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarProvider,
  SidebarMenu,
} from "~/common/components/ui/sidebar";
import { MessageItem } from "../components/message-item";
import type { Route } from "./+types/messages-layout";
import { makeSsrClient } from "~/supabase-client";
import { getRoomMembers, getSignedInUserId } from "../queries";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSsrClient(request);
  const userId = await getSignedInUserId(client);
  const rooms = await getRoomMembers(client, { userId });
  return { rooms };
};

export default function MessagesLayout({ loaderData }: Route.ComponentProps) {
  const { rooms } = loaderData;
  return (
    <SidebarProvider>
      <Sidebar className="pt-16" variant="floating">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {rooms.map((room) => (
                <MessageItem
                  id={room.message_room_id.toString()}
                  key={room.message_room_id}
                  name={room.name}
                  avatar={room.avatar}
                  lastMessage={room.last_message}
                />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <Outlet />
    </SidebarProvider>
  );
}

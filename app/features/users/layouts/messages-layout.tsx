import { Outlet } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarProvider,
  SidebarMenu,
} from "~/common/components/ui/sidebar";
import { MessageItem } from "../components/message-item";

export default function MessagesLayout() {
  return (
    <SidebarProvider className="max-h-[calc(100vh-64px)] overflow-hidden h-full min-h-full">
      <Sidebar className="pt-16" variant="floating">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {Array.from({ length: 20 }).map((_, index) => (
                <MessageItem
                  id={index.toString()}
                  key={index}
                  name="John Doe"
                  avatar="https://github.com/shadcn.png"
                  lastMessage="Last message"
                />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="h-full w-full">
        <Outlet />
      </div>
    </SidebarProvider>
  );
}

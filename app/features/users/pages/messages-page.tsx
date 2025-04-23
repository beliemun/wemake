import { MessageCircleIcon } from "lucide-react";
import type { Route } from "./+types/messages-page";

export const meta: Route.MetaFunction = () => {
  return [
    {
      title: "메시지",
    },
  ];
};

export default function MessagesPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <MessageCircleIcon className="size-12 text-muted-foreground" />
      <h1 className="text-xl font-bold text-muted-foreground">
        Click a message in the sidebar to view it.
      </h1>
    </div>
  );
}

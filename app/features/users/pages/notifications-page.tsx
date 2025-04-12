import type { Route } from "./+types/notifications-page";
import { NotificationCard } from "../components/notification-card";

export const meta: Route.MetaFunction = () => {
  return [
    {
      title: "알림",
    },
  ];
};

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">알림</h1>
      <div className="flex flex-col gap-6">
        <NotificationCard
          avatarUrl="https://github.com/shadcn.png"
          avatarFallback="CN"
          username="John Doe"
          action="followed you"
          timeAgo="2 days ago"
          seen={false}
        />
      </div>
    </div>
  );
}

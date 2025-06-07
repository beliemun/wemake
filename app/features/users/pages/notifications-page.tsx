import type { Route } from "./+types/notifications-page";
import { NotificationCard } from "../components/notification-card";
import { makeSsrClient } from "~/supabase-client";
import { getSignedInUserId } from "../queries";
import { getNotifications } from "../mutations";

export const meta: Route.MetaFunction = () => {
  return [
    {
      title: "알림",
    },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSsrClient(request);
  const userId = await getSignedInUserId(client);
  const notifications = await getNotifications(client, { userId });
  return { notifications };
};

export default function NotificationsPage({ loaderData }: Route.ComponentProps) {
  console.log(loaderData);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">알림</h1>
      <div className="flex flex-col gap-6">
        {loaderData.notifications.map((notification) => (
          <NotificationCard
            key={notification.notification_id}
            avatarUrl={notification.profile?.avatar ?? ""}
            avatarFallback={notification.profile?.name ?? ""}
            username={notification.profile?.name ?? ""}
            type={notification.type}
            productName={notification.product?.name ?? ""}
            postTitle={notification.post?.title ?? ""}
            timeAgo={notification.created_at}
            seen={notification.seen}
          />
        ))}
      </div>
    </div>
  );
}

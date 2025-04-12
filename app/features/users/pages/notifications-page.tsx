import type { Route } from "./+types/notifications-page";

export const meta: Route.MetaFunction = () => {
  return [
    {
      title: "알림",
    },
  ];
};

export default function NotificationsPage() {
  return <div>알림 페이지</div>;
}

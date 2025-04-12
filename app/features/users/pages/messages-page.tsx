import type { Route } from "./+types/messages-page";

export const meta: Route.MetaFunction = () => {
  return [
    {
      title: "메시지",
    },
  ];
};

export default function MessagesPage() {
  return <div>메시지 페이지</div>;
}

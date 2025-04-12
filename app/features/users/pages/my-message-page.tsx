import type { Route } from "./+types/my-message-page";

export const meta: Route.MetaFunction = () => {
  return [
    {
      title: "메시지 상세",
    },
  ];
};

export default function MyMessagePage() {
  return <div>메시지 상세 페이지</div>;
}

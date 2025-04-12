import type { Route } from "./+types/dashboard-page";

export const meta: Route.MetaFunction = () => {
  return [
    {
      title: "대시보드",
    },
  ];
};

export default function DashboardPage() {
  return <div>대시보드 페이지</div>;
}

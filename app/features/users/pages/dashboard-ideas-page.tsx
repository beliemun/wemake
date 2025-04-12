import type { Route } from "./+types/dashboard-ideas-page";

export const meta: Route.MetaFunction = () => {
  return [
    {
      title: "아이디어",
    },
  ];
};

export default function DashboardIdeasPage() {
  return <div>아이디어 페이지</div>;
}

import type { Route } from "./+types/dashboard-product-page";

export const meta: Route.MetaFunction = () => {
  return [
    {
      title: "제품 상세",
    },
  ];
};

export default function DashboardProductPage() {
  return <div>제품 상세 페이지</div>;
}

import { ProductCard } from "~/features/products/components/product-card";
import type { Route } from "./+types/profile-products-page";

export const meta: Route.MetaFunction = () => {
  return [
    {
      title: "제품 목록",
      description: "사용자의 제품 목록을 확인하세요",
    },
  ];
};

export default function ProfileProductsPage() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">제품 목록</h2>
      <div className="grid grid-cols-1 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard
            key={index}
            link={`/products/${index}`}
            productName="제품 이름"
            productDescription="제품 설명"
            commentsCount={0}
            votesCount={0}
            viewsCount={0}
          />
        ))}
      </div>
    </div>
  );
}

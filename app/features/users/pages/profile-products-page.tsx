import { ProductCard } from "~/features/products/components/product-card";
import type { Route } from "./+types/profile-products-page";
import { makeSsrClient } from "~/supabase-client";
import { getUserProducts } from "../queries";

export const meta: Route.MetaFunction = () => {
  return [
    {
      title: "제품 목록",
      description: "사용자의 제품 목록을 확인하세요",
    },
  ];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { username } = params;
  const { client } = makeSsrClient(request);
  const products = await getUserProducts(client, { username: username as string });
  return { products };
};

export default function ProfileProductsPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">제품 목록</h2>
      <div className="grid grid-cols-1 gap-4">
        {loaderData.products.map((product) => (
          <ProductCard
            key={product.product_id}
            link={`/products/${product.product_id}`}
            productName={product.name}
            productDescription={product.tagline}
            commentsCount={product.reviews ?? 0}
            votesCount={product.upvotes ?? 0}
            viewsCount={product.views ?? 0}
          />
        ))}
      </div>
    </div>
  );
}

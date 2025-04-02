import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/product-reviews-page";

export function loader({ params }: Route.LoaderArgs) {
  return {
    productId: params.productId,
  };
}

export function meta() {
  return [
    { title: "Product Reviews | Wemake" },
    { name: "description", content: "Product reviews page" },
  ];
}

export default function ProductReviewsPage({ loaderData }: Route.ComponentProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <Hero title="Product Reviews" />
    </main>
  );
}

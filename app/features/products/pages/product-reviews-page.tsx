import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/product-reviews-page";
import { ReviewCard } from "../components";

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

export default function ProductReviewsPage({ params: { productId } }: Route.ComponentProps) {
  return (
    <main className="flex flex-col px-4 py-8 gap-8">
      <div className="grid grid-cols-1 gap-8">
        {Array.from({ length: 5 }).map((_, index) => (
          <ReviewCard
            key={index}
            username="John Doe"
            userHandle="username"
            userAvatar="https://github.com/shadcn.png"
            userInitial="JD"
            rating={4}
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
          />
        ))}
      </div>
    </main>
  );
}

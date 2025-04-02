import type { Route } from "./+types/product-overview-page";
import { ChevronUp, StarIcon } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/common/components/ui/button";

export function loader({ params }: Route.LoaderArgs) {
  return {
    productId: params.productId,
  };
}

export function meta() {
  return [
    { title: "Product Overview | Wemake" },
    { name: "description", content: "Product overview page" },
  ];
}

// productId는 routes.tsx에서 정의되어 있기 때문에 여기서 사용할 수 있음
export default function ProductOverviewPage({ params: { productId } }: Route.ComponentProps) {
  return (
    <main className="flex flex-col px-4 py-8 gap-8">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-4">
          <img className="size-40 shadow-sm bg-muted" />
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Product Name</h1>
            <p className="text-sm text-muted-foreground">Product Description</p>
            <div className="flex flex-row gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon key={index} className="size-4 text-yellow-500" fill="currentColor" />
              ))}
              <span className="text-sm text-muted-foreground ml-2">100 reviews</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <Button variant="secondary" size="lg">
            Visit Website
          </Button>
          <Button size="lg">
            <ChevronUp className="size-4" />
            Upvote (100)
          </Button>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <Button variant={"outline"}>
          <Link to={`/products/${productId}/overview`}>Overview</Link>
        </Button>
        <Button variant={"outline"}>
          <Link to={`/products/${productId}/reviews`}>Reviews</Link>
        </Button>
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">What is it?</h3>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">How does it work?</h3>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </p>
        </div>
      </div>
    </main>
  );
}

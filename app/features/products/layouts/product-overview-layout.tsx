import { StarIcon } from "lucide-react";
import { ChevronUp } from "lucide-react";
import { NavLink, Outlet } from "react-router";
import { Button, buttonVariants } from "~/common/components/ui/button";
import type { Route } from "./+types/product-overview-layout";
import { cn } from "~/lib/utils";

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
export default function ProductOverviewLayout({ params: { productId } }: Route.ComponentProps) {
  return (
    <main className="flex flex-col px-4 py-8 gap-8">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-4">
          <img className="size-40 shadow-sm bg-muted" />
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-foreground">Product Name</h1>
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
        <NavLink
          className={({ isActive }) =>
            cn(buttonVariants({ variant: isActive ? "default" : "secondary" }))
          }
          to={`/products/${productId}/overview`}
        >
          Overview
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            cn(buttonVariants({ variant: isActive ? "default" : "secondary" }))
          }
          to={`/products/${productId}/reviews`}
        >
          Reviews
        </NavLink>
      </div>
      <Outlet />
    </main>
  );
}

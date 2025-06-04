import { StarIcon } from "lucide-react";
import { ChevronUp } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { Button, buttonVariants } from "~/common/components/ui/button";
import type { Route } from "./+types/product-overview-layout";
import { cn } from "~/lib/utils";
import { getProductById } from "../queries";
import { z } from "zod";
import { makeSsrClient } from "~/supabase-client";

export function meta() {
  return [
    { title: "Product Overview | Wemake" },
    { name: "description", content: "Product overview page" },
  ];
}

const paramsSchema = z.object({
  productId: z.coerce.number(),
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const parsedParams = paramsSchema.parse(params);
  const { client } = makeSsrClient(request);
  const product = await getProductById(client, parsedParams.productId);
  return { product };
};

// productId는 routes.tsx에서 정의되어 있기 때문에 여기서 사용할 수 있음
export default function ProductOverviewLayout({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  return (
    <main className="flex flex-col px-4 py-8 gap-8">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-4">
          <img
            className="size-40 shadow-sm bg-muted"
            src={loaderData.product.icon}
            alt={loaderData.product.name}
          />
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-foreground">{loaderData.product.name}</h1>
            <p className="text-sm text-muted-foreground">{loaderData.product.tagline}</p>
            <div className="flex flex-row gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon
                  key={index}
                  className="size-4 text-yellow-500"
                  fill={
                    index < Math.floor(loaderData.product.average_rating) ? "currentColor" : "none"
                  }
                />
              ))}
              <span className="text-sm text-muted-foreground ml-2">
                {loaderData.product.reviews} reviews
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <Button
            className="cursor-pointer"
            variant="secondary"
            size="lg"
            onClick={() => navigate(`/products/${loaderData.product.product_id}/visit`)}
          >
            Visit Website
          </Button>
          <Button className="cursor-pointer" size="lg">
            <ChevronUp className="size-4" />
            Upvote ({loaderData.product.upvotes})
          </Button>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <NavLink
          className={({ isActive }) =>
            cn(buttonVariants({ variant: isActive ? "default" : "secondary" }))
          }
          to={`/products/${loaderData.product.product_id}/overview`}
        >
          Overview
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            cn(buttonVariants({ variant: isActive ? "default" : "secondary" }))
          }
          to={`/products/${loaderData.product.product_id}/reviews`}
        >
          Reviews
        </NavLink>
      </div>
      <Outlet
        context={{
          description: loaderData.product.description,
          how_it_works: loaderData.product.how_it_works,
          productId: loaderData.product.product_id,
        }}
      />
    </main>
  );
}

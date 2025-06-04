import { Button } from "~/common/components/ui/button";
import { CreateReviewDialog, ReviewCard } from "../components";
import type { Route } from "./+types/product-reviews-page";
import { Dialog, DialogTrigger } from "~/common/components/ui/dialog";
import { useLoaderData, useOutletContext } from "react-router";
import { getReviewsByProductId } from "../queries";
import { makeSsrClient } from "~/supabase-client";

export function meta() {
  return [
    { title: "Product Reviews | Wemake" },
    { name: "description", content: "Product reviews page" },
  ];
}

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { productId } = params;
  const { client } = makeSsrClient(request);
  const reviews = await getReviewsByProductId(client, Number(productId));
  return { reviews };
};

export default function ProductReviewsPage({ loaderData }: Route.ComponentProps) {
  const { productId } = useOutletContext<{ productId: number }>();

  return (
    <Dialog>
      <div className="max-w-screen-md">
        <div className="flex flex-row justify-between">
          <h2 className="text-foreground font-bold">{loaderData.reviews.length} reviews</h2>
          <DialogTrigger asChild>
            <Button variant="secondary" className="cursor-pointer">
              Write a review
            </Button>
          </DialogTrigger>
        </div>
        <div className="flex flex-col gap-4">
          {loaderData.reviews.map((review) => (
            <ReviewCard
              key={review.review_id}
              name={review.user.name}
              userName={review.user.username}
              avatar={review.user.avatar}
              initial={review.user.name.slice(0, 2)}
              rating={review.rating}
              content={review.review}
              created_at={review.created_at}
            />
          ))}
        </div>
      </div>
      <CreateReviewDialog />
    </Dialog>
  );
}

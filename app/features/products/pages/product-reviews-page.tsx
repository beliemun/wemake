import { Button } from "~/common/components/ui/button";
import { CreateReviewDialog, ReviewCard } from "../components";
import type { Route } from "./+types/product-reviews-page";
import { Dialog, DialogTrigger } from "~/common/components/ui/dialog";
import { data, useLoaderData, useOutletContext } from "react-router";
import { getReviewsByProductId } from "../queries";
import { makeSsrClient } from "~/supabase-client";
import { getSignedInUserId } from "~/features/users/queries";
import { z } from "zod";
import { formSchema } from "~/features/auth/pages/otp-start-page";
import { createProductReview } from "../mutaitons";
import { useEffect, useState } from "react";

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

const fromSchema = z.object({
  review: z.string().min(1),
  rating: z.coerce.number().min(1).max(5),
});

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSsrClient(request);
  const userId = await getSignedInUserId(client);
  const formData = await request.formData();
  const { success, error, data } = fromSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return { formErrors: error.flatten().fieldErrors };
  }
  await createProductReview(client, {
    productId: Number(params.productId),
    userId,
    review: data.review,
    rating: data.rating,
  });
  return {
    success: true,
  };
};

export default function ProductReviewsPage({ loaderData, actionData }: Route.ComponentProps) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (actionData?.success) {
      setIsOpen(false);
    }
  }, [actionData]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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

import { Button } from "~/common/components/ui/button";
import { CreateReviewDialog, ReviewCard } from "../components";
import type { Route } from "./+types/product-reviews-page";
import { Dialog, DialogTrigger } from "~/common/components/ui/dialog";

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
    <Dialog>
      <div className="max-w-screen-md">
        <div className="flex flex-row justify-between">
          <h2 className="text-foreground font-bold">10 Reviews</h2>
          <DialogTrigger asChild>
            <Button variant="secondary" className="cursor-pointer">
              Write a review
            </Button>
          </DialogTrigger>
        </div>
        <div className="flex flex-col gap-4">
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
      </div>
      <CreateReviewDialog />
    </Dialog>
  );
}

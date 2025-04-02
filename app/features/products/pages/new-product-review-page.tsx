import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/new-product-review-page";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";

export function loader({ params }: Route.LoaderArgs) {
  return {
    productId: params.productId,
  };
}

export function meta() {
  return [
    { title: "New Product Review | Wemake" },
    { name: "description", content: "Create a new product review" },
  ];
}

export default function NewProductReviewPage({ loaderData }: Route.ComponentProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <Hero title="New Product Review" />
      <Form className="mt-8 max-w-2xl mx-auto space-y-6">
        <InputPair
          id="title"
          label="Review Title"
          description="Give your review a title"
          required
        />
        <InputPair
          id="content"
          label="Review Content"
          description="Write your review"
          required
          textArea
        />
        <Button type="submit">Submit Review</Button>
      </Form>
    </main>
  );
}

import { StarIcon } from "lucide-react";
import { useState } from "react";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/common/components/ui/dialog";
import { Label } from "~/common/components/ui/label";

export function CreateReviewDialog() {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">Write a review</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your account and remove your
          data from our servers.
        </DialogDescription>
      </DialogHeader>
      <Form className="flex flex-col gap-4">
        <div>
          <Label>Rating</Label>
          <small>How would you rate this product?</small>
          <div className="flex flex-row">
            {[1, 2, 3, 4, 5].map((star) => (
              <label
                key={star}
                className="relative flex flex-row gap-2 p-2 rounded-md"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <StarIcon
                  className="size-6 text-yellow-500"
                  fill={hoverRating >= star || rating >= star ? "currentColor" : "none"}
                />
                <input
                  type="radio"
                  name="rating"
                  value={star}
                  required
                  className="opacity-0 absolute"
                  onChange={() => setRating(star)}
                />
              </label>
            ))}
          </div>
        </div>
        <InputPair
          label="Review"
          description="Write a review for this product"
          placeholder="Write a review for this product"
          textArea
          required
        />
        <DialogFooter>
          <Button variant="secondary" className="cursor-pointer">
            Submit
          </Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  );
}

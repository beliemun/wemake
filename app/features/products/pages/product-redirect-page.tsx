import { redirect } from "react-router";
import type { Route } from "./+types/product-redirect-page";

export function loader({ params }: Route.LoaderArgs) {
  return redirect(`/products/${params.productId}/overview`);
}

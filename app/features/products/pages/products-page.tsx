import { redirect } from "react-router";
import type { Route } from "./+types/products-page";

export function loader({ request }: Route.LoaderArgs) {
  return redirect("/products/leaderboards");
}

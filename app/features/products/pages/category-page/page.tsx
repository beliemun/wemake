import type { Route } from "../+types/route.types";
import type { ComponentProps } from "./types";

export function loader({ request, params = {} }: Route.LoaderArgs) {
  return {
    category: params.category,
  };
}

export function action({ request }: Route.ActionArgs) {
  return {
    // Add action data here
  };
}

export function meta() {
  return [{ title: "Category | Wemake" }, { name: "description", content: "Products by category" }];
}

export default function CategoryPage({ loaderData, actionData }: ComponentProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Category: {loaderData.category}</h1>
      {/* Add content here */}
    </main>
  );
}

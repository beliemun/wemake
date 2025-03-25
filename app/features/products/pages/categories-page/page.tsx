import type { Route } from "../+types/route.types";
import type { ComponentProps } from "./types";

export function loader({ request }: Route.LoaderArgs) {
  return {
    // Add loader data here
  };
}

export function action({ request }: Route.ActionArgs) {
  return {
    // Add action data here
  };
}

export function meta() {
  return [
    { title: "Categories | Wemake" },
    { name: "description", content: "Browse products by category" },
  ];
}

export default function CategoriesPage({ loaderData, actionData }: ComponentProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Categories</h1>
      {/* Add content here */}
    </main>
  );
}

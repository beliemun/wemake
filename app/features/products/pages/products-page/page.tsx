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
    { title: "Products | Wemake" },
    { name: "description", content: "Discover and share amazing products" },
  ];
}

export default function ProductsPage({ loaderData, actionData }: ComponentProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Products</h1>
      {/* Add content here */}
    </main>
  );
}

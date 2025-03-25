import type { Route } from "./+types/products-page";

export function loader({ request }: Route.LoaderArgs) {
  return {};
}

export function meta() {
  return [
    { title: "Products | Wemake" },
    { name: "description", content: "Discover amazing products" },
  ];
}

export default function ProductsPage({ loaderData }: Route.ComponentProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Products</h1>
      {/* Add content here */}
    </main>
  );
}

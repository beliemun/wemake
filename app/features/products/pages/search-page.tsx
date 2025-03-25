import type { Route } from "./+types/search-page";

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";

  return {
    query,
  };
}

export function action({ request }: Route.ActionArgs) {
  return {
    // Add action data here
  };
}

export function meta() {
  return [{ title: "Search | Wemake" }, { name: "description", content: "Search products" }];
}

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Search Results for "{loaderData.query}"</h1>
      {/* Add content here */}
    </main>
  );
}

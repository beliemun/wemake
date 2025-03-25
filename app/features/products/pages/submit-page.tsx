import type { Route } from "./+types/submit-page";

export function loader({ request }: Route.LoaderArgs) {
  return {
    // Add loader data here
  };
}

export function meta() {
  return [
    { title: "Submit Product | Wemake" },
    { name: "description", content: "Submit a new product" },
  ];
}

export default function SubmitPage({ loaderData }: Route.ComponentProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Submit Product</h1>
      {/* Add content here */}
    </main>
  );
}

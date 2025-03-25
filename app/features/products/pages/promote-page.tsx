import type { Route } from "./+types/promote-page";

export function loader({ request }: Route.LoaderArgs) {
  return {};
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export function meta() {
  return [
    { title: "Promote Your Product | Wemake" },
    { name: "description", content: "Promote your product to reach more users" },
  ];
}

export default function PromotePage({ loaderData, actionData }: Route.ComponentProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Promote Your Product</h1>
      {/* Add content here */}
    </main>
  );
}

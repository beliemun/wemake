import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/categories-page";
import { CategoryCard } from "../components";
import { getCategories } from "../queries";
import { makeSsrClient } from "~/supabase-client";

export const meta: Route.MetaFunction = () => [
  { title: "Categories | ProductHunt Clone" },
  { name: "description", content: "Browse products by category" },
];

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSsrClient(request);
  const categories = await getCategories(client);
  return {
    categories,
  };
};

export default function CategoriesPage({ loaderData }: Route.ComponentProps) {
  return (
    <main className="px-4 py-8 space-y-8">
      <Hero title="Categories" description="Browse products by category" />
      <div className="grid grid-cols-4 gap-4">
        {loaderData.categories.map((category) => (
          <CategoryCard
            key={category.category_id}
            id={category.category_id.toString()}
            name={category.name}
            description={category.description}
          />
        ))}
      </div>
    </main>
  );
}

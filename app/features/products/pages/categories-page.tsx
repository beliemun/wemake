import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/categories-page";
import { CategoryCard } from "../components";

export function loader({ request }: Route.LoaderArgs) {
  return {
    // Add loader data here
  };
}

export const meta: Route.MetaFunction = () => [
  { title: "Categories | ProductHunt Clone" },
  { name: "description", content: "Browse products by category" },
];

export default function CategoriesPage() {
  return (
    <main className="px-4 py-8 space-y-8">
      <Hero title="Categories" description="Browse products by category" />
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <CategoryCard
            key={index}
            id={`categoryId-${index}`}
            name={`Category Name ${index}`}
            description={`Category Description ${index}`}
          />
        ))}
      </div>
    </main>
  );
}

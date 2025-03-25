import type { Route } from "../+types/route.types";
import type { ComponentProps } from "./types";

export function loader({ request, params = {} }: Route.LoaderArgs) {
  return {
    year: params.year,
  };
}

export function action({ request }: Route.ActionArgs) {
  return {
    // Add action data here
  };
}

export function meta() {
  return [
    { title: "Yearly Leaderboard | Wemake" },
    { name: "description", content: "Top products of the year" },
  ];
}

export default function YearlyLeaderboardPage({ loaderData, actionData }: ComponentProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Yearly Leaderboard {loaderData.year}</h1>
      {/* Add content here */}
    </main>
  );
}

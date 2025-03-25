import type { Route } from "./+types/weekly-leaderboard-page";

export function loader({ request, params }: Route.LoaderArgs) {
  return {
    year: params.year,
    week: params.week,
  };
}

export function meta() {
  return [
    { title: "Weekly Leaderboard | Wemake" },
    { name: "description", content: "Top products of the week" },
  ];
}

export default function WeeklyLeaderboardPage({ loaderData }: Route.ComponentProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">
        Weekly Leaderboard Week {loaderData.week}, {loaderData.year}
      </h1>
      {/* Add content here */}
    </main>
  );
}

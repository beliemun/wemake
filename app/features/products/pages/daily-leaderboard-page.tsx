import type { Route } from "./+types/daily-leaderboard-page";

export function loader({ request, params }: Route.LoaderArgs) {
  return {
    year: params.year,
    month: params.month,
    day: params.day,
  };
}

export function action({ request }: Route.ActionArgs) {
  return {
    // Add action data here
  };
}

export function meta() {
  return [
    { title: "Daily Leaderboard | Wemake" },
    { name: "description", content: "Top products of the day" },
  ];
}

export default function DailyLeaderboardPage({ loaderData }: Route.ComponentProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">
        Daily Leaderboard {loaderData.day}/{loaderData.month}/{loaderData.year}
      </h1>
      {/* Add content here */}
    </main>
  );
}

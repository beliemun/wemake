import type { Route } from "./+types/leaderboard-page";

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
    { title: "Leaderboard | Wemake" },
    { name: "description", content: "Top products of all time" },
  ];
}

export default function LeaderboardPage({ loaderData, actionData }: Route.ComponentProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Leaderboard</h1>
      {/* Add content here */}
    </main>
  );
}

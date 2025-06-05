import { Card } from "~/common/components/ui/card";
import type { Route } from "./+types/dashboard-ideas-page";
import { IdeaCard } from "~/features/ideas/components/idea-card";
import { makeSsrClient } from "~/supabase-client";
import { getSignedInUserId } from "../queries";
import { getClaimedIdeas, getGptIdeas } from "~/features/ideas/queries";

export const meta: Route.MetaFunction = () => {
  return [
    {
      title: "아이디어",
    },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSsrClient(request);
  const userId = await getSignedInUserId(client);
  const ideas = await getClaimedIdeas(client, { limit: 10, userId });
  return { ideas };
};

export default function DashboardIdeasPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <h1 className="text-2xl font-bold text-foreground">아이디어 페이지</h1>
      <div className="grid grid-cols-3 gap-4">
        {loaderData.ideas.map((idea) => (
          <IdeaCard
            key={idea.gpt_idea_id}
            ideaId={idea.gpt_idea_id.toString()}
            content={idea.idea}
            viewCount={idea.views}
            date={new Date().toISOString().split("T")[0]}
            owner={true}
          />
        ))}
      </div>
    </div>
  );
}

import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/ideas-page";
import { IdeaCard } from "../components";
import { getGptIdeas } from "../queries";
export const meta: Route.MetaFunction = () => {
  return [{ title: "Ideas | Wemake" }, { name: "description", content: "Browse and share ideas" }];
};

export const loader = async () => {
  const gptIdeas = await getGptIdeas({ limit: 20 });
  return { gptIdeas };
};

export default function IdeasPage({ loaderData }: Route.ComponentProps) {
  return (
    <main className="flex flex-col gap-8 px-4 py-8">
      <Hero title="Ideas" description="Browse and share ideas" />
      <div className="grid grid-cols-3 gap-4">
        {loaderData.gptIdeas.map((idea) => (
          <IdeaCard
            key={idea.gpt_idea_id}
            content={idea.idea}
            viewCount={idea.views}
            date={"12 hours ago"}
            likeCount={idea.likes}
            ideaId={idea.gpt_idea_id.toString()}
            claimed={idea.is_claimed}
          />
        ))}
      </div>
    </main>
  );
}

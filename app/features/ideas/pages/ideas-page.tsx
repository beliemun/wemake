import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/ideas-page";
import { IdeaCard } from "../components";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Ideas | Wemake" }, { name: "description", content: "Browse and share ideas" }];
};

export default function IdeasPage() {
  return (
    <main className="flex flex-col gap-8 px-4 py-8">
      <Hero title="Ideas" description="Browse and share ideas" />
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <IdeaCard
            key={index}
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
            viewCount={10}
            date="2021-01-01"
            likeCount={10}
            ideaId="1"
          />
        ))}
      </div>
    </main>
  );
}

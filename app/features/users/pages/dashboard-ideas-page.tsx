import { Card } from "~/common/components/ui/card";
import type { Route } from "./+types/dashboard-ideas-page";
import { IdeaCard } from "~/features/ideas/components/idea-card";

export const meta: Route.MetaFunction = () => {
  return [
    {
      title: "아이디어",
    },
  ];
};

export default function DashboardIdeasPage() {
  return (
    <div className="space-y-20">
      <h1 className="text-2xl font-bold text-foreground">아이디어 페이지</h1>
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <IdeaCard
            key={index}
            ideaId={index.toString()}
            content="A startup is a company that is created to start a new business. It is a company that is created to start a new business. It is a company that is created to start a new business."
            viewCount={0}
            date={new Date().toISOString().split("T")[0]}
            likeCount={0}
          />
        ))}
      </div>
    </div>
  );
}

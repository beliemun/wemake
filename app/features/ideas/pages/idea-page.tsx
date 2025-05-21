import { DotIcon, HeartIcon } from "lucide-react";
import { EyeIcon } from "lucide-react";
import type { Route } from "./+types/idea-page";
import { Button } from "~/common/components/ui/button";
import { getGptIdea } from "../queries";
import { DateTime } from "luxon";

export const meta = ({ data: { idea } }: Route.MetaArgs) => {
  return [
    { title: `Idea | ${idea.idea} | Wemake` },
    { name: "description", content: "Idea details page" },
  ];
};

export const loader = async ({ params }: Route.LoaderArgs) => {
  const idea = await getGptIdea({ gpt_idea_id: params.ideaId });
  return { idea };
};

export default function IdeaPage({ loaderData }: Route.ComponentProps) {
  return (
    <main className="flex flex-col px-4 py-8 gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Idea {loaderData.idea.idea}</h1>
        <p className="text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quisquam, quos.
        </p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <EyeIcon className="size-4" />
            <span>{loaderData.idea.views}</span>
          </div>
          <DotIcon className="size-4" />
          <span>{DateTime.fromISO(loaderData.idea.created_at).toRelative()}</span>
          <Button className="cursor-pointer" variant="outline">
            <HeartIcon className="size-4" />
            <span>{loaderData.idea.likes}</span>
          </Button>
        </div>
        <Button className="w-fit cursor-pointer" variant="default">
          Claim idea now &rarr;
        </Button>
      </div>
    </main>
  );
}

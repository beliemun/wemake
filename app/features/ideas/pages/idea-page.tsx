import { DotIcon, HeartIcon } from "lucide-react";
import { EyeIcon } from "lucide-react";
import type { Route } from "./+types/idea-page";
import { Button } from "~/common/components/ui/button";

export const meta = () => {
  return [{ title: "Idea | Wemake" }, { name: "description", content: "Idea details page" }];
};

export default function IdeaPage({ params: { ideaId } }: Route.ComponentProps) {
  return (
    <main className="flex flex-col px-4 py-8 gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Idea {ideaId}</h1>
        <p className="text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quisquam, quos.
        </p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <EyeIcon className="size-4" />
            <span>100</span>
          </div>
          <DotIcon className="size-4" />
          <span>12 hours ago</span>
          <Button className="cursor-pointer" variant="outline">
            <HeartIcon className="size-4" />
            <span>100</span>
          </Button>
        </div>
        <Button className="w-fit cursor-pointer" variant="default">
          Claim idea now &rarr;
        </Button>
      </div>
    </main>
  );
}

import { DotIcon, HeartIcon } from "lucide-react";
import { EyeIcon } from "lucide-react";
import type { Route } from "./+types/idea-page";
import { Button } from "~/common/components/ui/button";
import { getGptIdea } from "../queries";
import { DateTime } from "luxon";
import { makeSsrClient } from "~/supabase-client";
import { Form, redirect } from "react-router";
import { claimIdea } from "../mutations";
import { getSignedInUserId } from "~/features/users/queries";

export const meta = ({ data: { idea } }: Route.MetaArgs) => {
  return [
    { title: `Idea | ${idea.idea} | Wemake` },
    { name: "description", content: "Idea details page" },
  ];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client } = makeSsrClient(request);
  const idea = await getGptIdea(client, { gpt_idea_id: params.ideaId });

  if (idea.is_claimed) {
    return redirect(`/my/dashboard/ideas`);
  }
  return { idea };
};

export const action = async ({ params, request }: Route.ActionArgs) => {
  const { client } = makeSsrClient(request);
  const userId = await getSignedInUserId(client);
  const idea = await getGptIdea(client, { gpt_idea_id: params.ideaId });
  if (idea.is_claimed) {
    return {
      success: false,
    };
  }
  await claimIdea(client, { ideaId: params.ideaId, userid: userId });
  return redirect(`/my/dashboard/ideas`);
};

export default function IdeaPage({ loaderData }: Route.ComponentProps) {
  return (
    <main className="flex flex-col px-4 py-8 gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{loaderData.idea.idea}</h1>
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
        {loaderData.idea.is_claimed ? null : (
          <Form method="post">
            <Button className="w-fit cursor-pointer" variant="default">
              Claim idea now &rarr;
            </Button>
          </Form>
        )}
      </div>
    </main>
  );
}

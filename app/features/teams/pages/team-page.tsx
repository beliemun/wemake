import { Form } from "react-router";
import { Hero } from "~/common/components/hero";
import InputPair from "~/common/components/input-pair";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Separator } from "~/common/components/ui/separator";
import { getTeamById } from "../queries";
import type { Route } from "./+types/team-page";
import { makeSsrClient } from "~/supabase-client";

export const meta = () => {
  return [{ title: "팀 상세 | WeMake" }, { description: "팀의 상세 정보를 확인하세요." }];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client } = makeSsrClient(request);
  const team = await getTeamById(client, Number(params.teamId));
  return { team };
};

export default function TeamPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-6">
      <Hero
        title={`${loaderData.team.product_name}의 팀`}
        description="팀의 상세 정보를 확인하세요."
      />
      <div className="grid grid-cols-7 items-start gap-6">
        <div className="col-span-5 grid grid-cols-4 gap-6">
          {[
            {
              title: "Product Name",
              value: loaderData.team.product_name,
            },
            {
              title: "Stage",
              value: "Prototype",
            },
            {
              title: "Team Size",
              value: loaderData.team.team_size,
            },
            {
              title: "Available Equity",
              value: `${loaderData.team.equity_split}%`,
            },
          ].map((Item, index) => (
            <Card key={index} className="p-4">
              <CardHeader className="p-0">
                <CardTitle className="text-xs font-bold text-foreground">{Item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-lg text-muted-foreground p-0">{Item.value}</CardContent>
            </Card>
          ))}
          <Card className="p-4 col-span-2">
            <CardHeader className="p-0">
              <CardTitle>Looking For</CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              <ul className="row-span-2 list-disc list-inside space-y-2 text-muted-foreground">
                {loaderData.team.roles}
              </ul>
            </CardContent>
          </Card>
          <Card className="p-4 col-span-2">
            <CardHeader className="p-0">
              <CardTitle>{loaderData.team.product_description}</CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              <p className="text-muted-foreground">{loaderData.team.product_description}</p>
            </CardContent>
          </Card>
        </div>
        <aside className="sticky top-16 col-span-2 border border-foreground rounded-lg p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="w-10 h-10">
                <AvatarFallback>{loaderData.team.team_leader.username.slice(0, 2)}</AvatarFallback>
                <AvatarImage src={loaderData.team.team_leader.avatar ?? undefined} />
              </Avatar>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-bold text-foreground">
                  {loaderData.team.team_leader.username}
                </p>
                <Badge variant="secondary">
                  <span className="text-xs">{loaderData.team.team_leader.role}</span>
                </Badge>
              </div>
            </div>
            <Form className="flex flex-col gap-6">
              <InputPair
                label="Introduce"
                name="introduce"
                description="Introduce yourself"
                textArea
              />
              <InputPair
                label="Why do you want to join?"
                name="why"
                description="Why do you want to join?"
                textArea
              />
              <Button type="submit" className="w-ful cursor-pointer">
                Apply
              </Button>
            </Form>
            <Separator />
            <Button variant="outline" className="w-full cursor-pointer">
              Follow
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}

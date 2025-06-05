import { Form, redirect, useNavigation } from "react-router";
import { Hero } from "~/common/components/hero";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";
import { PRODUCT_STAGE } from "../constants";
import { makeSsrClient } from "~/supabase-client";
import { getSignedInUserId } from "~/features/users/queries";
import type { Route } from "./+types/team-submit-page";
import { z } from "zod";
import { createTeam } from "../mutations";
import { Loader2 } from "lucide-react";

export const meta = () => {
  return [{ title: "팀 등록 | WeMake" }, { description: "새로운 팀을 등록하세요." }];
};

export const formSchema = z.object({
  product_name: z.string().min(1, "상품명을 입력해주세요."),
  team_size: z.coerce.number().min(1, "팀원 수를 입력해주세요."),
  product_description: z.string().min(1, "제품 설명을 입력해주세요."),
  roles: z.string().min(1, "찾고 있는 역할을 입력해주세요."),
  equity_split: z.coerce.number().min(1, "팀원에게 보상할 생각을 입력해주세요."),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSsrClient(request);
  const userId = await getSignedInUserId(client);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return { fieldErrors: error.flatten().fieldErrors };
  }
  const { team_id } = await createTeam({
    client,
    userId,
    teamData: data,
  });
  return redirect(`/teams/${team_id}`);
};

export default function TeamSubmitPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  return (
    <div>
      <Hero title="팀 등록" description="새로운 팀을 등록하세요." />
      <Form className="flex flex-col gap-4 mx-auto" method="post">
        <div className="grid grid-cols-3 gap-6 p-6">
          <InputPair
            label="상품명"
            name="product_name"
            description="팀이 판매할 상품을 입력해주세요."
          />
          {actionData && "fieldErrors" in actionData && (
            <div className="text-red-500">{actionData.fieldErrors.product_name?.join(", ")}</div>
          )}
          <InputPair
            label="상품 설명"
            name="product_description"
            description="팀이 판매할 상품을 입력해주세요."
          />
          {actionData && "fieldErrors" in actionData && (
            <div className="text-red-500">
              {actionData.fieldErrors.product_description?.join(", ")}
            </div>
          )}
          <InputPair label="팀원 수" name="team_size" description="팀원 수를 입력해주세요." />
          {actionData && "fieldErrors" in actionData && (
            <div className="text-red-500">{actionData.fieldErrors.team_size?.join(", ")}</div>
          )}
          <InputPair
            label="찾고 있는 역할"
            name="roles"
            description="팀원에게 찾고 있는 역할을 입력해주세요."
          />
          {actionData && "fieldErrors" in actionData && (
            <div className="text-red-500">{actionData.fieldErrors.roles?.join(", ")}</div>
          )}
          <InputPair
            label="팀원에게 보상할 생각"
            name="equity_split"
            type="number"
            min={1}
            max={100}
            description="팀원에게 보상할 생각을 입력해주세요."
          />
          {actionData && "fieldErrors" in actionData && (
            <div className="text-red-500">{actionData.fieldErrors.equity_split?.join(", ")}</div>
          )}
        </div>
        <Button
          type="submit"
          className="self-end w-fit cursor-pointer"
          disabled={navigation.state === "submitting"}
        >
          {navigation.state === "submitting" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "등록"
          )}
        </Button>
      </Form>
    </div>
  );
}

import { Form } from "react-router";
import type { Route } from "./+types/settings-page";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import FilePair from "~/common/components/file-pair";
import { Button } from "~/common/components/ui/button";
import { makeSsrClient } from "~/supabase-client";
import { getSignedInUserId, getUserById } from "../queries";
import { roles } from "../schema";
import { z } from "zod";
import { updateUser } from "../mutations";
import { Alert, AlertDescription, AlertTitle } from "~/common/components/ui/alert";

export const meta: Route.MetaFunction = () => {
  return [
    {
      title: "설정",
    },
  ];
};

const formSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  headline: z.string().min(1),
  bio: z.string().min(1),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSsrClient(request);
  const userId = await getSignedInUserId(client);
  const formData = await request.formData();
  const { success, data, error } = await formSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return { formErrors: error.flatten().fieldErrors };
  }
  const { name, role, headline, bio } = data;
  const user = await updateUser(client, {
    id: userId,
    name,
    role: role as "developer" | "designer" | "marketer" | "founder" | "product_manager",
    headline,
    bio,
  });
  return { success: true };
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSsrClient(request);
  const userId = await getSignedInUserId(client);
  const user = await getUserById(client, { id: userId });
  return { user };
};

export default function SettingsPage({ loaderData, actionData }: Route.ComponentProps) {
  const { user } = loaderData;
  return (
    <div>
      <div className="grid grid-cols-6 items-start gap-6">
        {actionData?.success && (
          <Alert>
            <AlertTitle>성공</AlertTitle>
            <AlertDescription>Profile updated successfully</AlertDescription>
          </Alert>
        )}
        <div className="col-span-4">
          <h2 className="text-2xl font-bold">Edit Profile</h2>
          <Form className="flex flex-col gap-6 mt-6" method="post">
            <InputPair
              id="name"
              name="name"
              label="이름"
              description="이름을 입력하세요."
              placeholder="이름을 입력하세요."
              required
              defaultValue={user?.name}
            />
            {actionData?.formErrors?.name && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{actionData.formErrors.name.join(", ")}</AlertDescription>
              </Alert>
            )}
            <SelectPair
              name="role"
              label="역할"
              description="어떤 역할이 있나요?"
              placeholder="역할을 선택하세요."
              required
              options={roles.enumValues.map((role) => ({ label: role, value: role }))}
              defaultValue={user?.role ?? "Developer"}
            />
            {actionData?.formErrors?.role && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{actionData.formErrors.role.join(", ")}</AlertDescription>
              </Alert>
            )}
            <InputPair
              id="headline"
              name="headline"
              label="한줄 소개"
              description="한줄 소개를 입력하세요."
              placeholder="한줄 소개를 입력하세요."
              required
              defaultValue={user?.headline ?? ""}
            />
            {actionData?.formErrors?.headline && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{actionData.formErrors.headline?.join(", ")}</AlertDescription>
              </Alert>
            )}
            <InputPair
              id="bio"
              name="bio"
              label="자기 소개"
              description="자기 소개를 입력하세요."
              placeholder="자기 소개를 입력하세요."
              required
              defaultValue={user?.bio ?? ""}
            />
            {actionData?.formErrors?.bio && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{actionData.formErrors.bio}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-fit">
              Update Profile
            </Button>
          </Form>
        </div>
        <aside className="col-span-2">
          <Form>
            <FilePair name="avatar" label="Avatar" description="Avatar를 업로드하세요." />
            <Button type="submit">Update Avatar</Button>
          </Form>
        </aside>
      </div>
    </div>
  );
}

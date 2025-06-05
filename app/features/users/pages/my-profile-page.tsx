import { redirect } from "react-router";
import type { Route } from "./+types/my-profile-page";
import { makeSsrClient } from "~/supabase-client";
import { getUserById } from "../queries";

export const meta: Route.MetaFunction = () => {
  return [
    {
      title: "내 프로필",
    },
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
  const { client } = makeSsrClient(request);
  const {
    data: { user },
  } = await client.auth.getUser();
  if (user) {
    const profile = await getUserById({ id: user.id, request });
    return redirect(`/users/${profile?.username}`);
  }
  return redirect("/auth/sign-in");
}

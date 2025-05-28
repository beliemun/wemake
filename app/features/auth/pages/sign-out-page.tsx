import { redirect } from "react-router";
import { makeSsrClient } from "~/supabase-client";
import type { Route } from "./+types/sign-out-page";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSsrClient(request);
  await client.auth.signOut();
  return redirect("/", { headers });
};

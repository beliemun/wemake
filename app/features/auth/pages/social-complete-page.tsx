import { makeSsrClient } from "~/supabase-client";
import type { Route } from "./+types/social-complete-page";
import { z } from "zod";
import { redirect } from "react-router";

const paramsSchema = z.object({
  provider: z.enum(["github", "kakao"]),
});

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { success } = paramsSchema.safeParse(params);
  if (!success) {
    return redirect("/auth/sign-in");
  }
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) {
    return redirect("/auth/sign-in");
  }
  const { client, headers } = makeSsrClient(request);
  const { error } = await client.auth.exchangeCodeForSession(code);
  if (error) {
    throw error;
  }
  return redirect("/", { headers });
};

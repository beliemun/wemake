import { redirect } from "react-router";
import type { Route } from "./+types/otp-start-page";
import { z } from "zod";
import { makeSsrClient } from "~/supabase-client";

const paramsSchema = z.object({
  provider: z.enum(["github", "kakao"]),
});

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { success, data } = paramsSchema.safeParse(params);

  if (!success) {
    throw new Error("Invalid params");
  }

  const { provider } = data;
  const { client, headers } = makeSsrClient(request);
  const redirectTo = `http://localhost:5173/auth/social/${provider}/complete`;

  const {
    data: { url },
    error,
  } = await client.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
    },
  });
  console.log(url, error);
  if (url) {
    return redirect(url, { headers });
  }
  if (error) {
    throw new Error(error.message);
  }
};

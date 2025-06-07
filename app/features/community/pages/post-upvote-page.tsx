import { makeSsrClient } from "~/supabase-client";
import type { Route } from "./+types/post-upvote-page";
import { getSignedInUserId } from "~/features/users/queries";
import { toggleUpvote } from "../mutations";

export const action = async ({ request, params }: Route.ActionArgs) => {
  if (request.method !== "POST") {
    // post-upvote action은 postId가 필요한 post url에서만 호출되어야 한다.
    // 따라서, 다른 요청은 405 Method Not Allowed 에러를 반환한다.
    throw new Response("Method Not Allowed", { status: 405 });
  }
  const { client } = makeSsrClient(request);
  const userId = await getSignedInUserId(client);

  await toggleUpvote(client, { postId: Number(params.postId), userId });

  return { success: true };
};

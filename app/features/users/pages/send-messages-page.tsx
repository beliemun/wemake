import { makeSsrClient } from "~/supabase-client";
import type { Route } from "./+types/send-messages-page";
import { getSignedInUserId, getUserProfile } from "../queries";
import { sendMessage } from "../mutations";
import { z } from "zod";
import { redirect } from "react-router";

const formSchema = z.object({
  content: z.string().min(1),
});

export const action = async ({ request, params }: Route.ActionArgs) => {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const { username } = params;
  if (!username) {
    return Response.json({ error: "Username is required" }, { status: 400 });
  }

  const formData = await request.formData();
  const { content } = formSchema.parse(Object.fromEntries(formData));

  const { client } = makeSsrClient(request);
  const fromUserId = await getSignedInUserId(client);
  const { profile_id: toUserId } = await getUserProfile(client, { username });

  const messageRoomId = await sendMessage(client, {
    fromUserId,
    toUserId,
    content,
  });

  return redirect(`/my/messages/${messageRoomId}`);
};

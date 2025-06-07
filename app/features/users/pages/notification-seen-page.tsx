import { makeSsrClient } from "~/supabase-client";
import { getSignedInUserId } from "../queries";
import { seeNotification } from "../mutations";
import type { Route } from "./+types/notification-seen-page";
import { redirect } from "react-router";

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSsrClient(request);
  const userId = await getSignedInUserId(client);
  const notificationId = params.notificationId;

  await seeNotification(client, { notificationId: Number(notificationId), userId });
  return redirect("/my/notifications");
};

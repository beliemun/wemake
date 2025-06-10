import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
} from "~/common/components/ui/card";
import type { Route } from "./+types/message-page";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Form } from "react-router";
import { Textarea } from "~/common/components/ui/textarea";
import { Button } from "~/common/components/ui/button";
import { SendIcon } from "lucide-react";
import { MessageBubble } from "../components/message-bubble";
import { makeSsrClient } from "~/supabase-client";
import { getMessages, getSignedInUserId } from "../queries";
import { DateTime } from "luxon";

export const meta: Route.MetaFunction = () => {
  return [
    {
      title: "메시지 상세",
    },
  ];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client } = makeSsrClient(request);
  const userId = await getSignedInUserId(client);
  const messages = await getMessages(client, {
    messageRoomId: params.messageRoomId,
    userId,
  });
  return { messages, userId };
};

export default function MessagePage({ loaderData }: Route.ComponentProps) {
  const { messages, userId } = loaderData;
  return (
    <div className="flex flex-col justify-between size-full gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="size-12">
            <AvatarImage src={messages[0].sender.avatar ?? ""} />
            <AvatarFallback>{messages[0].sender.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle className="text-sm font-medium">{messages[0].sender.name}</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              {DateTime.fromISO(messages[0].created_at).toRelative()}
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className="flex flex-col gap-4 overflow-y-auto">
        {messages.map((message) => (
          <MessageBubble
            key={message.message_id}
            avatar={message.sender.avatar ?? ""}
            name={message.sender.name ?? ""}
            message={message.content}
            isCurrentUser={message.sender_id === userId}
          />
        ))}
      </div>
      <Card>
        <CardHeader>
          <Form className="relative flex flex-row items-center gap-2">
            <Textarea className="resize-none" placeholder="메시지를 입력하세요" rows={4} />
            <Button type="submit" className="absolute right-4">
              <SendIcon />
              전송
            </Button>
          </Form>
        </CardHeader>
      </Card>
    </div>
  );
}

import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
} from "~/common/components/ui/card";
import type { Route } from "./+types/message-page";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Form, useNavigation, useOutletContext } from "react-router";
import { Textarea } from "~/common/components/ui/textarea";
import { Button } from "~/common/components/ui/button";
import { SendIcon } from "lucide-react";
import { MessageBubble } from "../components/message-bubble";
import { browserClient, makeSsrClient, type Database } from "~/supabase-client";
import { getMessages, getParticipant, getSignedInUserId } from "../queries";
import { DateTime } from "luxon";
import { sendMessageToRoom } from "../mutations";
import { useEffect, useRef, useState } from "react";

export const meta: Route.MetaFunction = () => {
  return [
    {
      title: "메시지 상세",
    },
  ];
};

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSsrClient(request);
  const userId = await getSignedInUserId(client);
  const formData = await request.formData();
  const content = formData.get("content") as string;
  if (content.length > 0) {
    await sendMessageToRoom(client, {
      senderId: userId,
      content,
      messageRoomId: params.messageRoomId,
    });
    return { success: true };
  }
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client } = makeSsrClient(request);
  const userId = await getSignedInUserId(client);
  const messages = await getMessages(client, {
    messageRoomId: params.messageRoomId,
    userId,
  });
  const participant = await getParticipant(client, {
    messageRoomId: params.messageRoomId,
    userId,
  });

  return { userId, participant: participant.profile, messages };
};

export default function MessagePage({ loaderData, actionData }: Route.ComponentProps) {
  const [messages, setMessages] = useState(loaderData.messages);
  const { userId, participant } = loaderData;
  const formRef = useRef<HTMLFormElement>(null);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const { avatar, name } = useOutletContext<{ avatar: string; name: string }>();
  useEffect(() => {
    if (actionData?.success) {
      formRef.current?.reset();
    }
  }, [actionData?.success]);

  useEffect(() => {
    const changes = browserClient
      .channel(`message_rooms:${userId}-${loaderData.participant.profile_id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          // Realtime 중에는 join을 할 수 없다.
          // 실시간성의 제약으로 인해 데이터를 결합할 수 없기 때문이다.
          setMessages((prev) => [
            ...prev,
            payload.new as Database["public"]["Tables"]["messages"]["Row"],
          ]);
        }
      )
      .subscribe();
    return () => {
      changes.unsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-col justify-between size-full gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="size-12">
            <AvatarImage src={participant.avatar ?? undefined} />
            <AvatarFallback>{participant.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle className="text-sm font-medium">{participant.name}</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              {DateTime.fromISO(messages[messages.length - 1].created_at).toRelative()}
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className="flex flex-col gap-4 overflow-y-auto">
        {messages.map((message) => (
          <MessageBubble
            key={message.message_id}
            avatar={message.sender_id === userId ? avatar : participant.avatar ?? ""}
            name={message.sender_id === userId ? name : participant.name ?? ""}
            message={message.content}
            isCurrentUser={message.sender_id === userId}
          />
        ))}
      </div>
      <Card>
        <CardHeader>
          <Form ref={formRef} method="post" className="relative flex flex-row items-center gap-2">
            <Textarea
              className="resize-none"
              placeholder="메시지를 입력하세요"
              rows={4}
              name="content"
            />
            <Button
              type="submit"
              className="absolute right-4 cursor-pointer"
              disabled={isSubmitting}
            >
              <SendIcon />
              전송
            </Button>
          </Form>
        </CardHeader>
      </Card>
    </div>
  );
}

// form을 post하더라도 revalidation을 하지 않겠다는 명시적 선언
export const shouldRevalidate = () => {
  return false;
};

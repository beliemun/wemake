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

export const meta: Route.MetaFunction = () => {
  return [
    {
      title: "메시지 상세",
    },
  ];
};

export default function MessagePage() {
  return (
    <div className="flex flex-col justify-between size-full gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="size-12">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle className="text-sm font-medium">John Doe</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Last message
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className="flex flex-col gap-4 overflow-y-auto">
        {Array.from({ length: 7 }).map((_, index) => (
          <MessageBubble
            key={index}
            avatar="https://github.com/shadcn.png"
            name="John Doe"
            message="This is message from user. This is message from user. This is message from user."
            isCurrentUser={index % 2 === 0}
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

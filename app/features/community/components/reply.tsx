import { DotIcon } from "lucide-react";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { IoChatbubbleOutline } from "react-icons/io5";
import { Form, useActionData, useOutletContext } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { Textarea } from "~/common/components/ui/textarea";
import type { action } from "../pages/post-page";

interface ReplyProps {
  name?: string;
  authorName: string;
  authorAvatar?: string;
  timestamp: string | null;
  content: string;
  topLevel: boolean;
  parentId?: number | null;
  replies?: {
    reply_id: number;
    reply: string;
    created_at: string;
    user: {
      name: string;
      avatar: string;
      username: string;
    };
  }[];
}

export function Reply({
  name,
  authorName,
  authorAvatar,
  timestamp,
  content,
  topLevel,
  replies,
  parentId,
}: ReplyProps) {
  console.log("name", name);
  // useActionData는 가장 최근의 Post Navigation from 제출의 actionData를 가져온다. action 타입은 페이지에서 정의한 action 함수의 반환 타입이다.
  const actionData = useActionData<typeof action>();
  const [replying, setReplying] = useState(false);
  const handleToggleReply = () => {
    setReplying((prev) => !prev);
  };
  const {
    isSignedIn,
    name: signedInName,
    avatar: signedInAvatar,
  } = useOutletContext<{
    isSignedIn: boolean;
    name?: string;
    avatar?: string;
  }>();
  useEffect(() => {
    if (actionData?.success) {
      setReplying(false);
    }
  }, [actionData]);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-start gap-6">
        <div className="flex items-center gap-2">
          <Avatar className="w-10 h-10">
            <AvatarFallback>{authorName.slice(0, 2)}</AvatarFallback>
            <AvatarImage src={authorAvatar} />
            {authorAvatar && <AvatarImage src={authorAvatar} />}
          </Avatar>
        </div>
        <div className="flex flex-col gap-2 items-start w-full">
          <div className="flex flex-row items-center">
            <p className="text-sm font-bold text-foreground">{authorName}</p>
            <DotIcon className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">{timestamp}</p>
          </div>
          <p className="text-sm text-muted-foreground">{content}</p>
          {isSignedIn ? (
            <Button className="self-end cursor-pointer" variant="ghost" onClick={handleToggleReply}>
              <IoChatbubbleOutline /> Reply
            </Button>
          ) : null}
        </div>
      </div>
      {replying ? (
        <Form className="flex gap-6" method="post">
          <input type="hidden" name="parent_id" value={parentId ?? ""} />
          <Avatar className="w-10 h-10">
            <AvatarFallback>{signedInName?.slice(0, 2)}</AvatarFallback>
            <AvatarImage src={signedInAvatar} />
          </Avatar>
          <div className="flex flex-col items-end gap-6 w-full">
            <Textarea
              name="reply"
              className="w-full resize-none"
              rows={4}
              placeholder="댓글을 입력해주세요."
              defaultValue={`@${name}`}
            />
            <Button type="submit" className="cursor-pointer">
              댓글 작성
            </Button>
          </div>
        </Form>
      ) : null}
      {topLevel ? (
        <div className="pl-16">
          {replies?.map((reply) => (
            <Reply
              key={reply.reply_id}
              authorName={reply.user.name}
              authorAvatar={reply.user.avatar}
              timestamp={DateTime.fromISO(reply.created_at).toRelative()}
              content={reply.reply}
              topLevel={false}
              name={reply.user.name}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

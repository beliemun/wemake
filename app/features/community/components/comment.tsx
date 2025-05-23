import { DotIcon } from "lucide-react";
import { useState } from "react";
import { IoChatbubbleOutline } from "react-icons/io5";
import { Form } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { Textarea } from "~/common/components/ui/textarea";

interface ReplyProps {
  authorName: string;
  authorAvatar?: string;
  timestamp: string | null;
  content: string;
  topLevel: boolean;
}

export function Reply({ authorName, authorAvatar, timestamp, content, topLevel }: ReplyProps) {
  const [replying, setReplying] = useState(false);
  const handleToggleReply = () => {
    setReplying((prev) => !prev);
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-start gap-6">
        <div className="flex items-center gap-2">
          <Avatar className="w-10 h-10">
            <AvatarFallback>{authorName.slice(0, 2)}</AvatarFallback>
            {authorAvatar && <AvatarImage src={authorAvatar} />}
          </Avatar>
        </div>
        <div className="flex flex-col gap-2 items-start">
          <div className="flex flex-row items-center">
            <p className="text-sm font-bold text-foreground">{authorName}</p>
            <DotIcon className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">{timestamp}</p>
          </div>
          <p className="text-sm text-muted-foreground">{content}</p>
          <Button className="self-end cursor-pointer" variant="ghost" onClick={handleToggleReply}>
            <IoChatbubbleOutline /> Reply
          </Button>
        </div>
      </div>
      {replying ? (
        <Form className="flex gap-6">
          <Avatar className="w-10 h-10">
            <AvatarFallback>CN</AvatarFallback>
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <div className="flex flex-col items-end gap-6 w-full">
            <Textarea placeholder="댓글을 입력해주세요." rows={4} className="w-full resize-none" />
            <Button type="submit" className="cursor-pointer">
              댓글 작성
            </Button>
          </div>
        </Form>
      ) : null}
      {topLevel ? (
        <div className="pl-16">
          <Reply
            authorName="John Doe"
            authorAvatar="https://github.com/shadcn.png"
            timestamp="12 hours ago"
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
            topLevel={false}
          />
        </div>
      ) : null}
    </div>
  );
}

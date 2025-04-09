import { Form } from "react-router";
import { Button } from "~/common/components/ui/button";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";

export default function OTPStartPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">OTP 인증</h1>
        <p className="text-gray-500 dark:text-gray-400">이메일로 전송된 인증 코드를 입력하세요</p>
      </div>
      <Form method="post" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">이메일</Label>
          <Input id="email" name="email" type="email" placeholder="이메일을 입력하세요" required />
        </div>
        <Button className="w-full" type="submit">
          인증 코드 전송
        </Button>
      </Form>
    </div>
  );
}

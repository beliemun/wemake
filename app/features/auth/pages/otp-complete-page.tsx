import { Form } from "react-router";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";

export default function OTPCompletePage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">OTP 인증 완료</h1>
        <p className="text-gray-500 dark:text-gray-400">이메일로 전송된 인증 코드를 입력하세요</p>
      </div>
      <Form method="post" className="space-y-10">
        <InputPair
          id="email"
          name="email"
          type="email"
          label="이메일"
          description="인증 코드를 받을 이메일을 입력해주세요"
          placeholder="이메일을 입력하세요"
          required
        />
        <InputPair
          id="otp"
          name="otp"
          type="text"
          label="인증 코드"
          description="인증 코드를 입력해주세요"
          placeholder="인증 코드를 입력하세요"
          required
        />
        <Button className="w-full" type="submit">
          로그인
        </Button>
      </Form>
    </div>
  );
}

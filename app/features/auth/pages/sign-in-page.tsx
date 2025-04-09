import { Form, Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";

export default function SignInPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-6 text-center">
        <Button variant="secondary" asChild>
          <Link to="/auth/sign-up">회원가입</Link>
        </Button>
        <h1 className="text-3xl font-bold">로그인</h1>
        <p className="text-gray-500 dark:text-gray-400">계정에 로그인하여 서비스를 이용하세요</p>
      </div>
      <Form method="post" className="space-y-10">
        <InputPair
          id="email"
          name="email"
          type="email"
          label="이메일"
          description="가입하신 이메일을 입력해주세요"
          placeholder="이메일을 입력하세요"
          required
        />
        <InputPair
          id="password"
          name="password"
          type="password"
          label="비밀번호"
          description="가입하신 비밀번호를 입력해주세요"
          placeholder="비밀번호를 입력하세요"
          required
        />
        <Button className="w-full" type="submit">
          로그인
        </Button>
      </Form>
    </div>
  );
}

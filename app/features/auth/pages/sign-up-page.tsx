import { Form, Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";

export default function SignUpPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-6 text-center">
        <Button variant="secondary" asChild>
          <Link to="/auth/sign-in">로그인</Link>
        </Button>
        <h1 className="text-3xl font-bold">회원가입</h1>
        <p className="text-gray-500 dark:text-gray-400">새로운 계정을 만들어 서비스를 이용하세요</p>
      </div>
      <Form method="post" className="space-y-10">
        <InputPair
          id="name"
          name="name"
          type="text"
          label="이름"
          description="실명을 입력해주세요"
          placeholder="이름을 입력하세요"
          required
        />
        <InputPair
          id="email"
          name="email"
          type="email"
          label="이메일"
          description="로그인에 사용할 이메일을 입력해주세요"
          placeholder="이메일을 입력하세요"
          required
        />
        <InputPair
          id="password"
          name="password"
          type="password"
          label="비밀번호"
          description="8자 이상의 영문, 숫자, 특수문자를 포함한 비밀번호를 입력해주세요"
          placeholder="비밀번호를 입력하세요"
          required
        />
        <InputPair
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="비밀번호 확인"
          description="비밀번호를 한 번 더 입력해주세요"
          placeholder="비밀번호를 다시 입력하세요"
          required
        />
        <Button className="w-full" type="submit">
          회원가입
        </Button>
      </Form>
    </div>
  );
}

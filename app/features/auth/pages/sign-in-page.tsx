import { Form, Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";
import { Separator } from "~/common/components/ui/separator";
import { RiKakaoTalkFill, RiGithubFill } from "react-icons/ri";
import { IoLockClosed } from "react-icons/io5";

export default function SignInPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-6 text-center">
        <Button variant="secondary" asChild>
          <Link to="/auth/sign-up">회원가입</Link>
        </Button>
        <h1 className="text-3xl font-bold text-foreground">로그인</h1>
        <p className="text-gray-500 dark:text-gray-400">계정에 로그인하여 서비스를 이용하세요</p>
      </div>
      <Form method="post" className="space-y-6">
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
        <Separator />

        <Button className="w-full" variant="secondary" asChild>
          <Link to="/auth/social/kakao/start">
            <RiKakaoTalkFill fill="currentColor" />
            카카오 로그인
          </Link>
        </Button>
        <Button className="w-full" variant="secondary" asChild>
          <Link to="/auth/social/github/start">
            <RiGithubFill fill="currentColor" />
            깃허브 로그인
          </Link>
        </Button>
        <Button className="w-full" variant="secondary" asChild>
          <Link to="/auth/otp/start">
            <IoLockClosed fill="currentColor" />
            로그인
          </Link>
        </Button>
      </Form>
    </div>
  );
}

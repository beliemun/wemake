import { Form, Link, redirect, useNavigation } from "react-router";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";
import { Separator } from "~/common/components/ui/separator";
import { RiKakaoTalkFill, RiGithubFill } from "react-icons/ri";
import { IoLockClosed } from "react-icons/io5";
import type { Route } from "./+types/sign-in-page";
import { z } from "zod";
import { makeSsrClient } from "~/supabase-client";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const object = Object.fromEntries(formData);
  const { success, data, error } = formSchema.safeParse(object);
  if (!success) {
    return {
      formErrors: error.flatten().fieldErrors,
      loginError: null,
    };
  }

  const { email, password } = data;
  const { client, headers } = makeSsrClient(request);
  const { data: user, error: loginError } = await client.auth.signInWithPassword({
    email,
    password,
  });
  if (loginError) {
    return {
      formErrors: null,
      loginError: loginError.message,
    };
  }

  return redirect("/", { headers });
};

export default function SignInPage({ actionData }: Route.ComponentProps) {
  const { state } = useNavigation();
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
        {actionData && "formErrors" in actionData && (
          <div className="text-red-500">{actionData.formErrors?.email?.join(", ")}</div>
        )}
        <InputPair
          id="password"
          name="password"
          type="password"
          label="비밀번호"
          description="가입하신 비밀번호를 입력해주세요"
          placeholder="비밀번호를 입력하세요"
          required
        />
        {actionData && "formErrors" in actionData && (
          <div className="text-red-500">{actionData.formErrors?.password?.join(", ")}</div>
        )}
        <Button className="w-full" type="submit" disabled={state === "submitting"}>
          {state === "submitting" ? "로그인 중..." : "로그인"}
        </Button>
        {actionData && "loginError" in actionData && (
          <div className="text-red-500">{actionData.loginError}</div>
        )}
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

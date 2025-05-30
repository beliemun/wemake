import { Form, Link, redirect, useNavigation } from "react-router";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";
import { z } from "zod";
import { makeSsrClient } from "~/supabase-client";
import type { Route } from "./+types/sign-up-page";
import { checkUserNameExists } from "../queries";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(4),
  confirmPassword: z.string().min(4),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const object = Object.fromEntries(formData);
  const { success, data, error } = formSchema.safeParse(object);
  if (!success) {
    return { formErrors: error.flatten().fieldErrors };
  }
  const { exists } = await checkUserNameExists({ username: data.name }, request);
  if (exists) {
    return { formErrors: { name: ["이미 존재하는 이름입니다."] } };
  }
  if (data.password !== data.confirmPassword) {
    return { formErrors: { confirmPassword: ["비밀번호가 일치하지 않습니다."] } };
  }
  const { client, headers } = makeSsrClient(request);
  const { data: user, error: signUpError } = await client.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name,
      },
    },
  });
  console.log("signed up user:", user);
  if (signUpError) {
    return { signUpError: signUpError.message };
  }
  return redirect("/", { headers });
};

export default function SignUpPage({ loaderData, actionData }: Route.ComponentProps) {
  const { state } = useNavigation();
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
        {actionData && "formErrors" in actionData && (
          <div className="text-red-500">{actionData.formErrors?.name?.join(", ")}</div>
        )}
        <InputPair
          id="email"
          name="email"
          type="email"
          label="이메일"
          description="로그인에 사용할 이메일을 입력해주세요"
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
          description="8자 이상의 영문, 숫자, 특수문자를 포함한 비밀번호를 입력해주세요"
          placeholder="비밀번호를 입력하세요"
          required
        />
        {actionData && "formErrors" in actionData && (
          <div className="text-red-500">{actionData.formErrors?.password?.join(", ")}</div>
        )}
        <InputPair
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="비밀번호 확인"
          description="비밀번호를 한 번 더 입력해주세요"
          placeholder="비밀번호를 다시 입력하세요"
          required
        />
        {actionData && "formErrors" in actionData && (
          <div className="text-red-500">{actionData.formErrors?.confirmPassword?.join(", ")}</div>
        )}
        <Button className="w-full" type="submit" disabled={state === "submitting"}>
          {state === "submitting" ? "회원가입 중..." : "회원가입"}
        </Button>
        {actionData && "signUpError" in actionData && (
          <div className="text-red-500">{actionData.signUpError}</div>
        )}
      </Form>
    </div>
  );
}

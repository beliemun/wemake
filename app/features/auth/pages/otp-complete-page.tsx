import { Form, redirect, useNavigation, useSearchParams } from "react-router";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";
import type { Route } from "./+types/otp-complete-page";
import { z } from "zod";
import { makeSsrClient } from "~/supabase-client";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email(),
  otp: z.string().min(6),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(Object.fromEntries(formData));

  if (!success) {
    return { fieldErrors: error.flatten().fieldErrors };
  }

  const { email, otp } = data;
  const { client, headers } = makeSsrClient(request);
  const { error: verifyError } = await client.auth.verifyOtp({
    email,
    token: otp,
    type: "email",
  });

  if (verifyError) {
    return { verifyError: verifyError.message };
  }

  return redirect("/", { headers });
};

export default function OTPCompletePage({ actionData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const { state } = useNavigation();

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
          value={email ?? ""}
        />
        {actionData && "fieldErrors" in actionData && (
          <p className="text-red-500">{actionData.fieldErrors?.email?.join(", ")}</p>
        )}
        <InputPair
          id="otp"
          name="otp"
          type="text"
          label="인증 코드"
          description="인증 코드를 입력해주세요"
          placeholder="인증 코드를 입력하세요"
          required
        />
        {actionData && "fieldErrors" in actionData && (
          <p className="text-red-500">{actionData.fieldErrors?.otp?.join(", ")}</p>
        )}
        <Button className="w-full cursor-pointer" type="submit" disabled={state === "submitting"}>
          {state === "submitting" ? <Loader2 className="h-4 w-4 animate-spin" /> : "로그인"}
        </Button>
        {actionData && "verifyError" in actionData && (
          <p className="text-red-500">{actionData.verifyError}</p>
        )}
      </Form>
    </div>
  );
}

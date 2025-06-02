import { Form, redirect, useNavigation } from "react-router";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";
import { z } from "zod";
import type { Route } from "./+types/otp-start-page";
import { makeSsrClient } from "~/supabase-client";
import { Loader2 } from "lucide-react";

export const formSchema = z.object({
  email: z.string().email(),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { success, data } = formSchema.safeParse(Object.fromEntries(formData));

  if (!success) {
    return { error: "Invalid email address" };
  }

  const { email } = data;
  const { client } = makeSsrClient(request);
  const { data: user, error } = await client.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
    },
  });

  if (error) {
    return { error: "Failed to send OTP" };
  }
  if (user) {
    console.log("user", user);
  }

  return redirect(`/auth/otp/complete?email=${email}`);
};

export default function OTPStartPage({ actionData }: Route.ComponentProps) {
  const { state } = useNavigation();
  const { error } = actionData ?? { error: null };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">OTP 인증</h1>
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
        <Button className="w-full cursor-pointer" type="submit" disabled={state === "submitting"}>
          {state === "submitting" ? <Loader2 className="h-4 w-4 animate-spin" /> : "인증 코드 전송"}
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </Form>
    </div>
  );
}

import { Button } from "~/common/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Form, Link, redirect } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { JOB_TYPES, LOCATION_RANGES, SALARY_RANGES } from "../constants";
import { z } from "zod";
import { makeSsrClient } from "~/supabase-client";
import { createJob } from "../mutations";
import type { Route } from "./+types/job-submit-page";
export const meta: Route.MetaFunction = () => {
  return [
    { title: "구인 등록 | Wemake" },
    { name: "description", content: "새로운 구인 공고를 등록하세요." },
  ];
};

export const formSchema = z.object({
  position: z.string().max(50, "회사명은 50자 이하로 입력해주세요."),
  overview: z.string().max(500, "개요는 500자 이하로 입력해주세요."),
  responsibilities: z.string().max(500, "책임은 500자 이하로 입력해주세요."),
  qualifications: z.string().max(500, "자격요건은 500자 이하로 입력해주세요."),
  benefits: z.string().max(500, "복리후생은 500자 이하로 입력해주세요."),
  skills: z.string().max(500, "기술스택은 500자 이하로 입력해주세요."),
  companyName: z.string().max(50, "회사명은 50자 이하로 입력해주세요."),
  companyLogo: z.string().max(500, "회사 로고는 500자 이하로 입력해주세요."),
  companyLocation: z.string().max(500, "회사 위치는 500자 이하로 입력해주세요."),
  apply_url: z.string().max(500, "지원 링크는 500자 이하로 입력해주세요."),
  jobType: z.enum(JOB_TYPES.map((jobType) => jobType.value) as [string, ...string[]]),
  jobLocation: z.enum(LOCATION_RANGES.map((location) => location) as [string, ...string[]]),
  salaryRange: z.enum(SALARY_RANGES.map((salary) => salary) as [string, ...string[]]),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSsrClient(request);
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { success, error, data: parsedData } = formSchema.safeParse(data);
  if (!success) {
    console.log(error.flatten().fieldErrors);
    return {
      fieldErrors: error.flatten().fieldErrors,
    };
  }
  const { job_id } = await createJob(client, parsedData);
  return redirect(`/jobs/${job_id}`);
};

export default function JobSubmitPage({ actionData }: Route.ComponentProps) {
  return (
    <div>
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link to="/jobs">
            <ArrowLeft className="size-4" />
            <span>뒤로가기</span>
          </Link>
        </Button>
      </div>

      <h1 className="text-3xl font-bold mb-8">구인 공고 등록</h1>

      <Form method="post" className="grid grid-cols-3 gap-8">
        <InputPair
          id="position"
          name="position"
          label="직무"
          placeholder="직무를 입력하세요"
          description="직무를 입력하세요"
          defaultValue="직무를 입력하세요"
        />
        {actionData && "fieldErrors" in actionData && (
          <p className="text-red-500">
            {actionData.fieldErrors.position?.map((error) => error).join(", ")}
          </p>
        )}
        <InputPair
          id="overview"
          name="overview"
          label="개요"
          placeholder="개요를 입력하세요"
          description="개요를 입력하세요"
          defaultValue="개요를 입력하세요"
        />
        {actionData && "fieldErrors" in actionData && (
          <p className="text-red-500">
            {actionData.fieldErrors.overview?.map((error) => error).join(", ")}
          </p>
        )}
        <InputPair
          id="responsibilities"
          name="responsibilities"
          label="책임"
          placeholder="책임을 입력하세요"
          description="책임을 입력하세요"
          defaultValue="책임을 입력하세요"
        />
        {actionData && "fieldErrors" in actionData && (
          <p className="text-red-500">
            {actionData.fieldErrors.responsibilities?.map((error) => error).join(", ")}
          </p>
        )}
        <InputPair
          id="qualifications"
          name="qualifications"
          label="자격요건"
          placeholder="자격요건을 입력하세요"
          description="자격요건을 입력하세요"
          defaultValue="자격요건을 입력하세요"
        />
        {actionData && "fieldErrors" in actionData && (
          <p className="text-red-500">
            {actionData.fieldErrors.qualifications?.map((error) => error).join(", ")}
          </p>
        )}
        <InputPair
          id="benefits"
          name="benefits"
          label="복리후생"
          placeholder="복리후생을 입력하세요"
          description="복리후생을 입력하세요"
          defaultValue="복리후생을 입력하세요"
        />
        {actionData && "fieldErrors" in actionData && (
          <p className="text-red-500">
            {actionData.fieldErrors.benefits?.map((error) => error).join(", ")}
          </p>
        )}
        <InputPair
          id="skills"
          name="skills"
          label="기술스택"
          placeholder="기술스택을 입력하세요"
          description="기술스택을 입력하세요"
          defaultValue="기술스택을 입력하세요"
        />
        {actionData && "fieldErrors" in actionData && (
          <p className="text-red-500">
            {actionData.fieldErrors.skills?.map((error) => error).join(", ")}
          </p>
        )}
        <InputPair
          id="companyName"
          name="companyName"
          label="회사명"
          placeholder="회사명을 입력하세요"
          description="회사명을 입력하세요"
          defaultValue="회사명을 입력하세요"
        />
        {actionData && "fieldErrors" in actionData && (
          <p className="text-red-500">
            {actionData.fieldErrors.companyName?.map((error) => error).join(", ")}
          </p>
        )}
        <InputPair
          id="companyLogo"
          name="companyLogo"
          label="회사 로고"
          placeholder="회사 로고를 입력하세요"
          description="회사 로고를 입력하세요"
          defaultValue="회사 로고를 입력하세요"
        />
        {actionData && "fieldErrors" in actionData && (
          <p className="text-red-500">
            {actionData.fieldErrors.companyLogo?.map((error) => error).join(", ")}
          </p>
        )}
        <SelectPair
          name="companyLocation"
          label="회사 위치"
          placeholder="회사 위치를 입력하세요"
          description="회사 위치를 입력하세요"
          options={LOCATION_RANGES.map((location) => ({ value: location, label: location }))}
        />
        {actionData && "fieldErrors" in actionData && (
          <p className="text-red-500">
            {actionData.fieldErrors.companyLocation?.map((error) => error).join(", ")}
          </p>
        )}
        <InputPair
          id="apply_url"
          name="apply_url"
          label="지원 링크"
          placeholder="지원 링크를 입력하세요"
          description="지원 링크를 입력하세요"
        />
        <SelectPair
          name="jobType"
          label="직무 유형"
          placeholder="직무 유형을 선택하세요"
          description="직무 유형을 선택하세요"
          options={JOB_TYPES.map((jobType) => ({ value: jobType.value, label: jobType.label }))}
        />
        <SelectPair
          name="jobLocation"
          label="직무 위치"
          placeholder="직무 위치를 선택하세요"
          description="직무 위치를 선택하세요"
          options={LOCATION_RANGES.map((location) => ({ value: location, label: location }))}
        />
        <SelectPair
          name="salaryRange"
          label="연봉"
          placeholder="연봉을 선택하세요"
          description="연봉을 선택하세요"
          options={SALARY_RANGES.map((salary) => ({ value: salary, label: salary }))}
        />
        {actionData && "fieldErrors" in actionData && (
          <p className="text-red-500">
            {actionData.fieldErrors.salaryRange?.map((error) => error).join(", ")}
          </p>
        )}
        <Button type="submit" className="cursor-pointer">
          등록하기
        </Button>
      </Form>
    </div>
  );
}

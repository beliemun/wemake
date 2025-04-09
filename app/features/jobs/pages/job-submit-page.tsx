import type { ComponentProps, MetaFunction } from "./+types/job-submit-page";
import { Button } from "~/common/components/ui/button";
import { Textarea } from "~/common/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { LOCATION_RANGES, SALARY_RANGES } from "../constants";
export const meta: MetaFunction = () => {
  return [
    { title: "구인 등록 | Wemake" },
    { name: "description", content: "새로운 구인 공고를 등록하세요." },
  ];
};

export default function JobSubmitPage({ loaderData, actionData }: ComponentProps) {
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

      <form className="grid grid-cols-2 gap-4">
        <InputPair
          id="company"
          label="회사명"
          placeholder="회사명을 입력하세요"
          description="회사명을 입력하세요"
        />

        <SelectPair
          name="location"
          label="근무지"
          placeholder="근무지를 선택하세요"
          description="근무지를 선택하세요"
          options={LOCATION_RANGES.map((location) => ({ value: location, label: location }))}
        />

        <SelectPair
          name="employmentType"
          label="고용 형태"
          placeholder="고용 형태를 선택하세요"
          description="고용 형태를 선택하세요"
          options={[
            { value: "full-time", label: "정규직" },
            { value: "part-time", label: "파트타임" },
            { value: "contract", label: "계약직" },
            { value: "intern", label: "인턴" },
          ]}
        />

        <SelectPair
          name="salary"
          label="연봉"
          placeholder="연봉을 선택하세요"
          description="연봉을 선택하세요"
          options={SALARY_RANGES.map((salary) => ({ value: salary, label: salary }))}
        />

        <div className="space-y-2">
          <label htmlFor="overview" className="text-sm font-medium">
            개요
          </label>
          <Textarea id="overview" placeholder="직무에 대한 개요를 입력하세요" />
        </div>

        <div className="space-y-2">
          <label htmlFor="requirements" className="text-sm font-medium">
            필요한 자격 요건
          </label>
          <Textarea id="requirements" placeholder="필요한 자격 요건을 입력하세요" />
        </div>

        <div className="space-y-2">
          <label htmlFor="skills" className="text-sm font-medium">
            필요한 기술 스택
          </label>
          <Textarea id="skills" placeholder="필요한 기술 스택을 입력하세요" />
        </div>

        <div className="space-y-2">
          <label htmlFor="benefits" className="text-sm font-medium">
            제공되는 복리후생
          </label>
          <Textarea id="benefits" placeholder="제공되는 복리후생을 입력하세요" />
        </div>
        <Button type="submit" className="col-span-2">
          등록하기
        </Button>
      </form>
    </div>
  );
}

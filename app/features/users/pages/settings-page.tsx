import { Form } from "react-router";
import type { Route } from "./+types/settings-page";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import FilePair from "~/common/components/file-pair";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [
    {
      title: "설정",
    },
  ];
};

export default function SettingsPage() {
  return (
    <div>
      <div className="grid grid-cols-6 items-start gap-6">
        <div className="col-span-4">
          <h2 className="text-2xl font-bold">Edit Profile</h2>
          <Form className="flex flex-col gap-6 mt-6">
            <InputPair
              id="name"
              label="이름"
              description="이름을 입력하세요."
              placeholder="이름을 입력하세요."
              required
            />
            <SelectPair
              name="role"
              label="역할"
              description="어떤 역할이 있나요?"
              placeholder="역할을 선택하세요."
              required
              options={[
                { label: "프론트엔드 개발자", value: "frontend" },
                { label: "백엔드 개발자", value: "backend" },
                { label: "디자이너", value: "designer" },
                { label: "기획자", value: "planner" },
              ]}
            />
            <InputPair
              id="bio"
              label="소개"
              description="소개를 입력하세요."
              placeholder="소개를 입력하세요."
              required
            />
            <InputPair
              id="bio"
              label="소개"
              description="소개를 입력하세요."
              placeholder="소개를 입력하세요."
              required
            />
            <Button type="submit" className="w-fit">
              Update Profile
            </Button>
          </Form>
        </div>
        <aside className="col-span-2">
          <Form>
            <FilePair name="avatar" label="Avatar" description="Avatar를 업로드하세요." />
            <Button type="submit">Update Avatar</Button>
          </Form>
        </aside>
      </div>
    </div>
  );
}

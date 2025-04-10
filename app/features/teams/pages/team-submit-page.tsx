import { Form } from "react-router";
import { Hero } from "~/common/components/hero";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";

export const meta = () => {
  return [{ title: "팀 등록 | WeMake" }, { description: "새로운 팀을 등록하세요." }];
};

export default function TeamSubmitPage() {
  return (
    <div>
      <Hero title="팀 등록" description="새로운 팀을 등록하세요." />
      <Form className="flex flex-col gap-4 mx-auto">
        <div className="grid grid-cols-3 gap-6 p-6">
          <InputPair
            label="어떤 상품을 판매할 생각인가요?"
            name="product"
            description="팀이 판매할 상품을 입력해주세요."
          />
          <InputPair
            label="얼마나 진행되었나요?"
            name="progress"
            description="팀이 진행된 정도를 입력해주세요."
          />
          <InputPair label="팀 이름은 뭔가요?" name="name" description="팀 이름을 입력해주세요." />
          <InputPair
            label="몇 명으로 이루어져 있나요?"
            name="description"
            description="팀원 수를 입력해주세요."
          />
          <InputPair
            label="찾고 있는 역할은 무엇인가요?"
            name="role"
            description="팀원에게 찾고 있는 역할을 입력해주세요."
          />
          <InputPair
            label="팀원에게 무엇을 보상할 생각이신가요?"
            name="tags"
            description="팀원에게 보상할 생각을 입력해주세요."
          />
        </div>
        <Button type="submit" className="self-end w-fit">
          등록
        </Button>
      </Form>
    </div>
  );
}

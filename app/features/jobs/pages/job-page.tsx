import { Button } from "~/common/components/ui/button";
import { useNavigate } from "react-router";
import { DollarSign, MapPin, Briefcase, DotIcon, EyeIcon } from "lucide-react";
import type { Route } from "./+types/jobs-page";
import { Badge } from "~/common/components/ui/badge";

export const meta: Route.MetaFunction = () => {
  return [{ title: `구인 상세` }, { name: "description", content: "구인 상세 정보를 확인하세요." }];
};

export default function JobPage() {
  const navigate = useNavigate();

  const handleClickApply = () => {};

  return (
    <div className="flex flex-col gap-8">
      <img
        src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4"
        alt="company logo"
        className="w-full h-40 rounded-lg object-cover"
      />

      <div className="grid grid-cols-3 gap-4 items-start rounded-lg p-6">
        <div className="grid col-span-2 gap-4">
          <h1 className="text-3xl font-bold mb-4 text-foreground">프론트엔드 개발자</h1>

          <div className="flex items-center gap-4 mb-6">
            <Badge className="flex items-center gap-2" variant="secondary">
              <Briefcase className="w-4 h-4" />
              <span>정규직</span>
            </Badge>
            <Badge className="flex items-center gap-2" variant="secondary">
              <MapPin className="w-4 h-4" />
              <span>서울</span>
            </Badge>
            <Badge className="flex items-center gap-2" variant="secondary">
              <DollarSign className="w-4 h-4" />
              <span>4000만원 ~ 5000만원</span>
            </Badge>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Overview</h2>
              <p className="text-muted-foreground">
                이 프론트엔드 개발자는 웹 애플리케이션을 개발하고, 사용자 경험을 개선하는 일을 하게
                됩니다. 근무는 오프라인으로 진행되며, 월 근무시간은 40시간입니다. 월 근무시간은 협의
                가능합니다. 정규직 근무자는 월 근무시간 40시간을 초과할 수 있습니다. 근무지는 서울시
                강남구입니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Requirements</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>React와 TypeScript 경험</li>
                <li>웹 표준과 접근성에 대한 이해</li>
                <li>Git을 사용한 협업 경험</li>
                <li>문제 해결 능력과 커뮤니케이션 스킬</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Skills</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>React</li>
                <li>TypeScript</li>
                <li>Next.js</li>
                <li>Tailwind CSS</li>
                <li>Git</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Benefits</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>4대 보험 가입</li>
                <li>점심 식대 지원</li>
                <li>휴식시간 제공</li>
              </ul>
            </section>
          </div>
          <div className="mt-8">
            <Button size="lg" className="w-fit">
              지원하기
            </Button>
          </div>
        </div>
        <div className="sticky top-16 grid border border-muted-foreground rounded-lg p-4 gap-4">
          <div className="flex flex-col gap-2">
            <small className="text-muted-foreground">급여</small>
            <p className="text-xl font-bold text-foreground">4000만원 ~ 5000만원</p>
          </div>
          <div className="flex flex-col gap-2">
            <small className="text-muted-foreground">지역</small>
            <p className="text-xl font-bold text-foreground">서울</p>
          </div>
          <div className="flex flex-col gap-2">
            <small className="text-muted-foreground">근무 유형</small>
            <p className="text-xl font-bold text-foreground">정규직</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <EyeIcon className="size-4" />
              <span>100</span>
            </div>
            <DotIcon className="size-4" />
            <span>12 hours ago</span>
          </div>
          <Button className="cursor-pointer" onClick={handleClickApply}>
            지원하기
          </Button>
        </div>
      </div>
    </div>
  );
}

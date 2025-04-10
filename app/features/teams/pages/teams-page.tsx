import { Hero } from "~/common/components/hero";
import { TeamCard } from "..";

export const meta = () => {
  return [{ title: "팀 목록 | WeMake" }, { description: "WeMake의 모든 팀을 확인하세요." }];
};

export default function TeamsPage() {
  return (
    <div className="flex flex-col gap-8">
      <Hero title="팀 상세" description="팀의 상세 정보를 확인하세요." />
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <TeamCard
            key={index}
            username="brian"
            userAvatar="https://github.com/shadcn.png"
            userInitial="B"
            position={["React Developer", "Frontend Developer", "Backend Developer"]}
            description="to build a new social media platform."
            teamId="teamId"
          />
        ))}
      </div>
    </div>
  );
}

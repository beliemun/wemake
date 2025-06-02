import { Button } from "~/common/components/ui/button";
import { DollarSign, MapPin, Briefcase, DotIcon, EyeIcon } from "lucide-react";
import type { Route } from "./+types/job-page";
import { Badge } from "~/common/components/ui/badge";
import { getJobById } from "../queries";
import { DateTime } from "luxon";
import { makeSsrClient } from "~/supabase-client";

export const meta: Route.MetaFunction = () => {
  return [{ title: `구인 상세` }, { name: "description", content: "구인 상세 정보를 확인하세요." }];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client } = makeSsrClient(request);
  const job = await getJobById(client, Number(params.jobId));
  return { job };
};

export default function JobPage({ loaderData }: Route.ComponentProps) {
  const { job } = loaderData;

  return (
    <div className="flex flex-col gap-8">
      <img
        src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4"
        alt="company logo"
        className="w-full h-40 rounded-lg object-cover"
      />

      <div className="grid grid-cols-3 gap-4 items-start rounded-lg p-6">
        <div className="grid col-span-2 gap-4">
          <h1 className="text-3xl font-bold mb-4 text-foreground">{job.position}</h1>

          <div className="flex items-center gap-4 mb-6">
            <Badge className="flex items-center gap-2" variant="secondary">
              <Briefcase className="w-4 h-4" />
              <span>{job.job_type}</span>
            </Badge>
            <Badge className="flex items-center gap-2" variant="secondary">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </Badge>
            <Badge className="flex items-center gap-2" variant="secondary">
              <DollarSign className="w-4 h-4" />
              <span>{job.salary_range}</span>
            </Badge>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Overview</h2>
              <p className="text-muted-foreground">{job.overview}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Qualifications</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>{job.qualifications}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Responsibilities</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>{job.responsibilities}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Benefits</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>{job.benefits}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Skills</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>{job.skills}</li>
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
            <p className="text-xl font-bold text-foreground">{job.salary_range}</p>
          </div>
          <div className="flex flex-col gap-2">
            <small className="text-muted-foreground">지역</small>
            <p className="text-xl font-bold text-foreground">{job.location}</p>
          </div>
          <div className="flex flex-col gap-2">
            <small className="text-muted-foreground">근무 유형</small>
            <p className="text-xl font-bold text-foreground">{job.job_type}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <EyeIcon className="size-4" />
              <span>100</span>
            </div>
            <DotIcon className="size-4" />
            <span>{DateTime.fromISO(job.created_at).toRelative()}</span>
          </div>
          <Button className="cursor-pointer">지원하기</Button>
        </div>
      </div>
    </div>
  );
}

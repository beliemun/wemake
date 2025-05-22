import { data, redirect, useSearchParams } from "react-router";
import { JobCard } from "../components";
import { JOB_TYPES, LOCATION_RANGES, SALARY_RANGES } from "../constants";
import type { Route } from "./+types/jobs-page";
import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components/ui/button";
import { z } from "zod";
import { getJobs } from "../queries";
import { DateTime } from "luxon";
import type { JobType, SalaryRange } from "../types";
export const meta: Route.MetaFunction = () => {
  return [{ title: "Jobs | Wemake" }, { name: "description", content: "Browse and post jobs" }];
};

const searchParamsSchema = z.object({
  jobType: z.enum(JOB_TYPES.map((jobType) => jobType.value) as [string, ...string[]]).optional(),
  location: z.enum(LOCATION_RANGES).optional(),
  salary: z.enum(SALARY_RANGES).optional(),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  console.log("url", url.searchParams);
  const { success, data: parsedData } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );
  if (!success) {
    throw data(
      {
        error_code: "INVALID_SEARCH_PARAMS",
        message: "Invalid search params",
      },
      { status: 400 }
    );
  }
  console.log("parsedData", parsedData);
  const jobs = await getJobs({
    limit: 11,
    location: parsedData.location,
    jobType: parsedData.jobType as JobType,
    salary: parsedData.salary as SalaryRange,
  });
  return { jobs };
};

export default function JobsPage({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const onFliterClick = (key: string, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };

  return (
    <main className="flex flex-col px-4 py-8 gap-8">
      <Hero title="Jobs" description="Browse and post jobs" />
      <div className="grid grid-cols-3 gap-4 items-start">
        <div className="grid grid-cols-2 col-span-2 gap-4">
          {loaderData.jobs.map((job, index) => (
            <JobCard
              key={job.job_id}
              companyLogo={job.company_logo}
              companyName={job.company_name}
              postedDate={DateTime.fromISO(job.created_at).toRelative()}
              badges={["Full-time", "Remote", "Senior"]}
              title={job.position}
              salary={job.salary_range}
              location={job.location}
              jobId={job.job_id.toString()}
            />
          ))}
        </div>
        <div className="sticky top-16 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-muted-foreground">Job Type</h2>
            <div className="flex flex-wrap gap-2">
              {JOB_TYPES.map((jobType) => (
                <Button
                  className="w-fit cursor-pointer"
                  variant={searchParams.get("jobType") === jobType.value ? "default" : "outline"}
                  key={jobType.value}
                  onClick={() => onFliterClick("jobType", jobType.value)}
                >
                  {jobType.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-muted-foreground">Location</h2>
            <div className="flex flex-wrap gap-2">
              {LOCATION_RANGES.map((locationRange) => (
                <Button
                  className="w-fit cursor-pointer"
                  variant={searchParams.get("location") === locationRange ? "default" : "outline"}
                  key={locationRange}
                  onClick={() => onFliterClick("location", locationRange)}
                >
                  {locationRange}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-muted-foreground">Salary Range</h2>
            <div className="flex flex-wrap gap-2">
              {SALARY_RANGES.map((salaryRange) => (
                <Button
                  className="w-fit cursor-pointer"
                  variant={searchParams.get("salary") === salaryRange ? "default" : "outline"}
                  key={salaryRange}
                  onClick={() => onFliterClick("salary", salaryRange)}
                >
                  {salaryRange}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

import { useSearchParams } from "react-router";
import { JobCard } from "../components";
import { JOB_TYPES, LOCATION_RANGES, SALARY_RANGES } from "../constants";
import type { Route } from "./+types/jobs-page";
import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components/ui/button";
export const meta: Route.MetaFunction = () => {
  return [{ title: "Jobs | Wemake" }, { name: "description", content: "Browse and post jobs" }];
};

export default function JobsPage() {
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
          {Array.from({ length: 30 }).map((_, index) => (
            <JobCard
              key={index}
              companyLogo="https://github.com/shadcn.png"
              companyName="Company Name"
              postedDate="2021-01-01"
              title="Job Title"
              location="Seoul, Korea"
              salary="10000000"
              jobId={`job-${index}`}
              badges={["Full-time", "Remote"]}
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

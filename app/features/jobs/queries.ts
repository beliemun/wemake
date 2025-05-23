import client from "~/supabase-client";
import type { JobType, Location, SalaryRange } from "./types";

export const getJobs = async ({
  limit,
  location,
  jobType,
  salary,
}: {
  limit: number;
  location?: Location;
  jobType?: JobType;
  salary?: SalaryRange;
}) => {
  let baseQuery = client
    .from("jobs")
    .select(
      `
        job_id,
        position,
        overview,
        company_name,
        company_logo,
        company_location,
        apply_url,
        job_type,
        location,
        salary_range,
        created_at
    `
    )
    .limit(limit);

  if (location && location !== "전체") {
    baseQuery = baseQuery.eq("location", location);
  }

  if (jobType && jobType !== "all") {
    baseQuery = baseQuery.eq("job_type", jobType);
  }

  if (salary && salary !== "전체") {
    baseQuery = baseQuery.eq("salary_range", salary);
  }

  const { data, error } = await baseQuery;

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getJobById = async (jobId: number) => {
  const { data, error } = await client.from("jobs").select("*").eq("job_id", jobId).single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

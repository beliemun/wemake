import { z } from "zod";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { formSchema } from "./pages/job-submit-page";
import type { Database } from "~/supabase-client";
import type { JobType, Location, SalaryRange } from "./types";

export const createJob = async (
  client: SupabaseClient<Database>,
  data: z.infer<typeof formSchema>
) => {
  const { data: jobData, error } = await client
    .from("jobs")
    .insert({
      position: data.position,
      overview: data.overview,
      responsibilities: data.responsibilities,
      qualifications: data.qualifications,
      benefits: data.benefits,
      skills: data.skills,
      company_name: data.companyName,
      company_logo: data.companyLogo,
      company_location: data.companyLocation,
      apply_url: data.apply_url,
      job_type: data.jobType as JobType,
      location: data.jobLocation as Location,
      salary_range: data.salaryRange as SalaryRange,
    })
    .select()
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return jobData;
};

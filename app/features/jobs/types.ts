import { LOCATION_RANGES, JOB_TYPES, SALARY_RANGES } from "./constants";

export type Location = (typeof LOCATION_RANGES)[number];
export type JobType = (typeof JOB_TYPES)[number]["value"];
export type SalaryRange = (typeof SALARY_RANGES)[number];

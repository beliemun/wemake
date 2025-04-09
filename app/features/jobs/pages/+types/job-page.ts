import type { MetaFunction } from "react-router";

export interface LoaderData {
  jobId: string;
}

export interface ActionData {
  // Add action data properties here when needed
}

export interface ComponentProps {
  params: {
    jobId: string;
  };
  loaderData: LoaderData;
  actionData: ActionData;
}

export interface LoaderArgs {
  request: Request;
  params: {
    jobId: string;
  };
}

export interface ActionArgs {
  request: Request;
  params: {
    jobId: string;
  };
}

export interface MetaFunctionArgs {
  data: LoaderData;
  params: {
    jobId: string;
  };
}

export type MetaFunction = (
  args: MetaFunctionArgs
) => Array<{ title: string } | { name: string; content: string }>;

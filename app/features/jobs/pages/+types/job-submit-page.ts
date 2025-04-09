import type { MetaFunction } from "react-router";

export interface LoaderData {
  // Add loader data properties here when needed
}

export interface ActionData {
  // Add action data properties here when needed
}

export interface ComponentProps {
  loaderData: LoaderData;
  actionData: ActionData;
}

export interface LoaderArgs {
  request: Request;
}

export interface ActionArgs {
  request: Request;
}

export interface MetaFunctionArgs {
  data: LoaderData;
}

export type MetaFunction = (
  args: MetaFunctionArgs
) => Array<{ title: string } | { name: string; content: string }>;

import type { Route } from "../+types/route.types";

export interface LoaderData {
  category: string;
}

export interface ActionData {
  // Add action data properties here when needed
}

export type ComponentProps = Route.ComponentProps & {
  loaderData: LoaderData;
  actionData: ActionData;
};

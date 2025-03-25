import type { Route } from "../../+types/route.types";

export interface LoaderData {
  // Add loader data properties here when needed
}

export interface ActionData {
  // Add action data properties here when needed
}

export type ComponentProps = Route.ComponentProps & {
  loaderData: LoaderData;
  actionData: ActionData;
};

import type { MetaFunction as RouterMetaFunction } from "react-router";

export namespace Route {
  export interface LoaderArgs {
    request: Request;
    params?: Record<string, string>;
  }

  export interface ActionArgs {
    request: Request;
    formData: FormData;
  }

  export interface MetaFunction extends RouterMetaFunction {}

  export interface ComponentProps {
    loaderData: Record<string, unknown>;
    actionData: Record<string, unknown>;
  }
}

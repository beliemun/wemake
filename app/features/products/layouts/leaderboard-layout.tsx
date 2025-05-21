import { data, Outlet } from "react-router";
import { z } from "zod";
import type { Route } from "./+types/product-overview-layout";

const searchParamsSchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const { success } = searchParamsSchema.safeParse(Object.fromEntries(url.searchParams));

  if (!success) {
    throw data(
      {
        code: "INVALID_PARAMS",
        message: "Invalid params",
      },
      { status: 400 }
    );
  }
};

export default function LeaderboardLayout() {
  return <Outlet />;
}

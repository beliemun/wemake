import { ChartTooltipContent, type ChartConfig } from "~/common/components/ui/chart";
import { ChartTooltip } from "~/common/components/ui/chart";
import { Area, AreaChart, CartesianGrid, Line, XAxis } from "recharts";
import type { Route } from "./+types/dashboard-product-page";
import { Card, CardContent, CardHeader, CardTitle } from "~/common/components/ui/card";
import { ChartContainer } from "~/common/components/ui/chart";
import { makeSsrClient } from "~/supabase-client";
import { getSignedInUserId } from "../queries";

const chartConfig = {
  views: {
    label: "views",
    color: "var(--chart-1)",
  },
  visitors: {
    label: "visitors",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export const meta: Route.MetaFunction = () => {
  return [
    {
      title: "제품 상세",
    },
  ];
};

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSsrClient(request);
  const userId = await getSignedInUserId(client);
  const { error } = await client
    .from("products")
    .select("product_id")
    .eq("profile_id", userId)
    .eq("product_id", Number(params.productId))
    .single();
  if (error) {
    throw error;
  }
  const { data, error: rpcError } = await client.rpc("get_product_stats", {
    product_id: params.productId,
  });
  if (rpcError) {
    throw rpcError;
  }
  return { chartData: data };
};

export default function DashboardProductPage({ loaderData }: Route.ComponentProps) {
  const { chartData } = loaderData;
  return (
    <div className="space-y-20">
      <h1 className="text-2xl font-bold text-foreground">판매 분석</h1>
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>대시보드</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                padding={{ left: 15, right: 15 }}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Area
                dataKey="product_view"
                type="natural"
                stroke="var(--color-views)"
                fill="var(--color-views)"
                strokeWidth={2}
                dot={false}
                fillOpacity={0.3}
              />
              <Area
                dataKey="product_visit"
                type="natural"
                stroke="var(--color-visitors)"
                fill="var(--color-visitors)"
                strokeWidth={2}
                dot={false}
                fillOpacity={0.3}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

import { ChartTooltipContent, type ChartConfig } from "~/common/components/ui/chart";
import { ChartTooltip } from "~/common/components/ui/chart";
import { Area, AreaChart, CartesianGrid, Line, XAxis } from "recharts";
import { LineChart } from "recharts";
import type { Route } from "./+types/dashboard-product-page";
import { Card, CardContent, CardHeader, CardTitle } from "~/common/components/ui/card";
import { ChartContainer } from "~/common/components/ui/chart";

const chartData = [
  { month: "January", views: 186, visitors: 100 },
  { month: "February", views: 305, visitors: 200 },
  { month: "March", views: 237, visitors: 300 },
  { month: "April", views: 73, visitors: 400 },
  { month: "May", views: 209, visitors: 500 },
  { month: "June", views: 214, visitors: 600 },
];
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

export default function DashboardProductPage() {
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
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Area
                dataKey="views"
                type="natural"
                stroke="var(--color-views)"
                fill="var(--color-views)"
                strokeWidth={2}
                dot={false}
                fillOpacity={0.3}
              />
              <Area
                dataKey="visitors"
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

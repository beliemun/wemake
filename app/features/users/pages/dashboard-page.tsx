import { Card, CardContent, CardHeader, CardTitle } from "~/common/components/ui/card";
import type { Route } from "./+types/dashboard-page";
import { CartesianGrid, XAxis } from "recharts";
import { ChartTooltip, type ChartConfig } from "~/common/components/ui/chart";
import { ChartTooltipContent } from "~/common/components/ui/chart";
import { Line } from "recharts";
import { ChartContainer } from "~/common/components/ui/chart";
import { LineChart } from "recharts";

const chartData = [
  { month: "January", views: 186 },
  { month: "February", views: 305 },
  { month: "March", views: 237 },
  { month: "April", views: 73 },
  { month: "May", views: 209 },
  { month: "June", views: 214 },
];
const chartConfig = {
  views: {
    label: "views",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export const meta: Route.MetaFunction = () => {
  return [
    {
      title: "대시보드",
    },
  ];
};

export default function DashboardPage() {
  return (
    <div className="space-y-20">
      <h1 className="text-2xl font-bold text-foreground">대시보드 페이지</h1>
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>대시보드</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
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
              <Line
                dataKey="views"
                type="natural"
                stroke="var(--color-views)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

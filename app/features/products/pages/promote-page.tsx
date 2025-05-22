import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/promote-page";
import CalendarPair from "~/common/components/calendar-pair";
import type { DateRange } from "react-day-picker";
import { useState } from "react";
import { DateTime } from "luxon";
import { Button } from "~/common/components/ui/button";

export function loader({ request }: Route.LoaderArgs) {
  return {};
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export function meta() {
  return [
    { title: "Promote Your Product | Wemake" },
    { name: "description", content: "Promote your product to reach more users" },
  ];
}

export default function PromotePage({ loaderData, actionData }: Route.ComponentProps) {
  const [promoteDate, setPromoteDate] = useState<DateRange | undefined>(undefined);

  const totalDays =
    promoteDate?.from && promoteDate?.to
      ? DateTime.fromJSDate(promoteDate.to).diff(DateTime.fromJSDate(promoteDate.from), "days").days
      : 0;
  return (
    <main className="flex flex-col px-4 py-8 gap-8">
      <Hero title="Promote Your Product" />
      <div className="flex flex-col items-center gap-2">
        <CalendarPair
          id="date"
          label="Select a product"
          description="Select a product you want to promote"
          selected={promoteDate}
          onSelect={setPromoteDate}
        />
        <Button size="lg" disabled={totalDays === 0}>
          {`Promote - $${totalDays * 20}`}
        </Button>
      </div>
    </main>
  );
}

import { useOutletContext } from "react-router";
import type { Route } from "./+types/product-overview-page";

export default function ProductOverviewPage({ loaderData }: Route.ComponentProps) {
  const { description, how_it_works } = useOutletContext<{
    description: string;
    how_it_works: string;
  }>();

  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold">What is it?</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold">How does it work?</h3>
        <p className="text-sm text-muted-foreground">{how_it_works}</p>
      </div>
    </div>
  );
}

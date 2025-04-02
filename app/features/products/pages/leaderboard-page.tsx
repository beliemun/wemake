import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/leaderboard-page";
import { ProductCard } from "../components";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import { Separator } from "~/common/components/ui/separator";

export function loader({ request }: Route.LoaderArgs) {
  return {};
}

export function meta() {
  return [
    { title: "Leaderboard | Wemake" },
    { name: "description", content: "The most popular products on wemake" },
  ];
}

export default function LeaderboardPage({ loaderData }: Route.ComponentProps) {
  return (
    <main className="container mx-auto px-4 py-8 space-y-12">
      <Hero title="Leaderboard" description="The most popular products on wemake" />
      <section className="grid grid-cols-3 items-center gap-4">
        <div className="flex flex-col items-start gap-2">
          <h2 className="text-foreground text-3xl font-bold leading-tight tracking-tight">
            Daily Leaderboard
          </h2>
          <p className="font-light text-foreground">The best products for our comunty today.</p>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard
            key={index}
            link={`/products/productId-${index}`}
            productName="Product Name"
            productDescription="Product Description"
            commentsCount={100}
            viewsCount={100}
            votesCount={100}
          />
        ))}
        <Button variant="link" asChild>
          <Link to="/products/leaderboards/daily">View all products &rarr;</Link>
        </Button>
      </section>
      <Separator />
      <section className="grid grid-cols-3 items-center gap-4">
        <div className="flex flex-col items-start gap-2">
          <h2 className="text-foreground text-3xl font-bold leading-tight tracking-tight">
            Weekly Leaderboard
          </h2>
          <p className="font-light text-foreground">The best products for our comunty this week.</p>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard
            key={index}
            link={`/products/productId-${index}`}
            productName="Product Name"
            productDescription="Product Description"
            commentsCount={100}
            viewsCount={100}
            votesCount={100}
          />
        ))}
        <Button variant="link" asChild>
          <Link to="/products/leaderboards/weekly">View all products &rarr;</Link>
        </Button>
      </section>
      <Separator />
      <section className="grid grid-cols-3 items-center gap-4">
        <div className="flex flex-col items-start gap-2">
          <h2 className="text-foreground text-3xl font-bold leading-tight tracking-tight">
            Monthly Leaderboard
          </h2>
          <p className="font-light text-foreground">
            The best products for our comunty this month.
          </p>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard
            key={index}
            link={`/products/productId-${index}`}
            productName="Product Name"
            productDescription="Product Description"
            commentsCount={100}
            viewsCount={100}
            votesCount={100}
          />
        ))}
        <Button variant="link" asChild>
          <Link to="/products/leaderboards/monthly">View all products &rarr;</Link>
        </Button>
      </section>
      <Separator />
      <section className="grid grid-cols-3 items-center gap-4">
        <div className="flex flex-col items-start gap-2">
          <h2 className="text-foreground text-3xl font-bold leading-tight tracking-tight">
            Yearly Leaderboard
          </h2>
          <p className="font-light text-foreground">The best products for our comunty this year.</p>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard
            key={index}
            link={`/products/productId-${index}`}
            productName="Product Name"
            productDescription="Product Description"
            commentsCount={100}
            viewsCount={100}
            votesCount={100}
          />
        ))}
        <Button variant="link" asChild>
          <Link to="/products/leaderboards/yearly">View all products &rarr;</Link>
        </Button>
      </section>
    </main>
  );
}

import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/leaderboard-page";
import { ProductCard } from "../components";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import { Separator } from "~/common/components/ui/separator";
import { getProductsByDateRange } from "../queries";
import { DateTime } from "luxon";
import { makeSsrClient } from "~/supabase-client";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSsrClient(request);
  const dailyProductsPromise = getProductsByDateRange(client, {
    startDate: DateTime.now().startOf("day"),
    endDate: DateTime.now().endOf("day"),
    limit: 7,
    page: 1,
  });
  const weeklyProductsPromise = getProductsByDateRange(client, {
    startDate: DateTime.now().startOf("week"),
    endDate: DateTime.now().endOf("week"),
    limit: 7,
    page: 1,
  });
  const monthlyProductsPromise = getProductsByDateRange(client, {
    startDate: DateTime.now().startOf("month"),
    endDate: DateTime.now().endOf("month"),
    limit: 7,
    page: 1,
  });
  const yearlyProductsPromise = getProductsByDateRange(client, {
    startDate: DateTime.now().startOf("year"),
    endDate: DateTime.now().endOf("year"),
    limit: 7,
    page: 1,
  });
  const [dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts] = await Promise.all([
    dailyProductsPromise,
    weeklyProductsPromise,
    monthlyProductsPromise,
    yearlyProductsPromise,
  ]);
  return { dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts };
};

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
        {loaderData.dailyProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            link={`/products/${product.product_id}`}
            productName={product.name}
            productDescription={product.tagline}
            commentsCount={product.reviews}
            viewsCount={product.views}
            votesCount={product.upvotes}
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
        {loaderData.weeklyProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            link={`/products/${product.product_id}`}
            productName={product.name}
            productDescription={product.tagline}
            commentsCount={product.reviews}
            viewsCount={product.views}
            votesCount={product.upvotes}
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
        {loaderData.monthlyProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            link={`/products/${product.product_id}`}
            productName={product.name}
            productDescription={product.tagline}
            commentsCount={product.reviews}
            viewsCount={product.views}
            votesCount={product.upvotes}
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
        {loaderData.yearlyProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            link={`/products/${product.product_id}`}
            productName={product.name}
            productDescription={product.tagline}
            commentsCount={product.reviews}
            viewsCount={product.views}
            votesCount={product.upvotes}
          />
        ))}
        <Button variant="link" asChild>
          <Link to="/products/leaderboards/yearly">View all products &rarr;</Link>
        </Button>
      </section>
    </main>
  );
}

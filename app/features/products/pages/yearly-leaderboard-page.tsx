import { DateTime } from "luxon";
import type { Route } from "./+types/yearly-leaderboard-page";
import { data, isRouteErrorResponse, Link } from "react-router";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components";
import { Button } from "~/common/components/ui/button";
import ProductPagination from "~/common/components/product-pagination";

export const paramsSchema = z.object({
  year: z.coerce.number(),
});

export const loader = ({ params }: Route.LoaderArgs) => {
  const { success, data: parsedData } = paramsSchema.safeParse(params);
  if (!success) {
    throw data({
      code: "INVALID_PARAMS",
      message: "Invalid params",
    });
  }

  // fromObject는 문자열로 된 날짜를 받아서 날짜 객체로 변환
  const date = DateTime.fromObject({
    year: parsedData.year,
  });
  if (!date.isValid) {
    throw data(
      {
        code: "INVALID_DATE",
        message: "Invalid date",
      },
      { status: 400 }
    );
  }
  const today = DateTime.now().startOf("year");
  if (date > today) {
    throw data(
      {
        code: "FUTURE_DATE",
        message: "Future date",
      },
      { status: 400 }
    );
  }

  return data(parsedData);
};

export default function YearlyLeaderboardPage({ loaderData }: Route.ComponentProps) {
  const urlDate = DateTime.fromObject({
    year: loaderData.year,
  });
  const previousYear = urlDate.minus({ year: 1 });
  const nextYear = urlDate.plus({ year: 1 });
  const isToday = urlDate.hasSame(DateTime.now(), "year");
  return (
    <main className="px-4 py-8 space-y-6">
      <Hero title={`월간 최고 상품, ${urlDate.toLocaleString({ year: "numeric" })}`} />
      <div className="flex justify-center gap-2">
        <Button variant="secondary">
          <Link to={`/products/leaderboards/yearly/${previousYear.year}`}>
            &larr; {previousYear.toLocaleString({ year: "numeric" })}
          </Link>
        </Button>
        {!isToday ? (
          <Button variant="secondary">
            <Link to={`/products/leaderboards/yearly/${nextYear.year}`}>
              {nextYear.toLocaleString({ year: "numeric" })} &rarr;
            </Link>
          </Button>
        ) : null}
      </div>
      <div className="grid grid-cols-1 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard
            key={index}
            link="/products/productId"
            productName="Product Name"
            productDescription="Product Description"
            commentsCount={100}
            viewsCount={100}
            votesCount={100}
          />
        ))}
      </div>
      <ProductPagination totalPages={10} />
    </main>
  );
}

// 가장 가까운 ErrorBoundary를 찾아서 오류 처리
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  console.log(error);
  if (isRouteErrorResponse(error)) {
    if (error.status === 400) {
      return (
        <div>
          {error.data.message} / {error.status}
        </div>
      );
    }
  }
  return <div>Error</div>;
}

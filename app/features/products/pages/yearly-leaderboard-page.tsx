import { DateTime } from "luxon";
import type { Route } from "./+types/yearly-leaderboard-page";
import { data, isRouteErrorResponse, Link } from "react-router";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components";
import { Button } from "~/common/components/ui/button";
import ProductPagination from "~/common/components/product-pagination";
import { getProductPagesByDateRange, getProductsByDateRange } from "../queries";

export const paramsSchema = z.object({
  year: z.coerce.number(),
});

// data는 loader에서 반환한 데이터
export const meta: Route.MetaFunction = ({ params, data }) => {
  const date = DateTime.fromObject({
    year: Number(params.year),
  });
  return [
    {
      title: `연간 최고 상품, ${date.toLocaleString({ year: "numeric" })} | Wemake`,
    },
  ];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
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
  const url = new URL(request.url);
  const products = await getProductsByDateRange({
    startDate: date.startOf("year"),
    endDate: date.endOf("year"),
    limit: 10,
    page: Number(url.searchParams.get("page") ?? 1),
  });
  const totalPages = await getProductPagesByDateRange({
    startDate: date.startOf("year"),
    endDate: date.endOf("year"),
  });
  return {
    ...parsedData,
    products,
    totalPages,
  };
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
        {loaderData.products.map((product) => (
          <ProductCard
            key={product.product_id}
            link={`/products/productId-${product.product_id}`}
            productName={product.name}
            productDescription={product.description}
            commentsCount={product.reviews}
            viewsCount={product.views}
            votesCount={product.upvotes}
          />
        ))}
      </div>
      <ProductPagination totalPages={loaderData.totalPages} />
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

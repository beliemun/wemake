import { DateTime } from "luxon";
import type { Route } from "./+types/weekly-leaderboard-page";
import { data, isRouteErrorResponse, Link } from "react-router";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components";
import { Button } from "~/common/components/ui/button";
import ProductPagination from "~/common/components/product-pagination";
import { getProductPagesByDateRange, getProductsByDateRange } from "../queries";

export const paramsSchema = z.object({
  year: z.coerce.number(),
  week: z.coerce.number(),
});

// data는 loader에서 반환한 데이터
export const meta: Route.MetaFunction = ({ params, data }) => {
  const date = DateTime.fromObject({
    weekYear: data.year,
    weekNumber: data.week,
  });
  return [
    {
      title: `주간 최고 상품, ${date.toLocaleString(DateTime.DATE_MED)} | Wemake`,
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
    weekYear: parsedData.year,
    weekNumber: parsedData.week,
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
  const today = DateTime.now().startOf("week");
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
    startDate: date.startOf("week"),
    endDate: date.endOf("week"),
    limit: 10,
    page: Number(url.searchParams.get("page") ?? 1),
  });
  const totalPages = await getProductPagesByDateRange({
    startDate: date.startOf("week"),
    endDate: date.endOf("week"),
  });
  return {
    ...parsedData,
    products,
    totalPages,
  };
};

export default function WeeklyLeaderboardPage({ loaderData }: Route.ComponentProps) {
  const urlDate = DateTime.fromObject({
    weekYear: loaderData.year,
    weekNumber: loaderData.week,
  });
  const previousWeek = urlDate.minus({ week: 1 });
  const nextWeek = urlDate.plus({ week: 1 });
  const isToday = urlDate.hasSame(DateTime.now(), "week");
  return (
    <main className="px-4 py-8 space-y-6">
      <Hero title={`주간 최고 상품, ${urlDate.toLocaleString(DateTime.DATE_MED)}`} />
      <div className="flex justify-center gap-2">
        <Button variant="secondary">
          <Link
            to={`/products/leaderboards/weekly/${previousWeek.year}/${previousWeek.weekNumber}`}
          >
            &larr; {previousWeek.toLocaleString(DateTime.DATE_MED)}
          </Link>
        </Button>
        {!isToday ? (
          <Button variant="secondary">
            <Link to={`/products/leaderboards/weekly/${nextWeek.year}/${nextWeek.weekNumber}`}>
              {nextWeek.toLocaleString(DateTime.DATE_MED)} &rarr;
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

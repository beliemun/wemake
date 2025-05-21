import { DateTime } from "luxon";
import type { Route } from "./+types/daily-leaderboard-page";
import { data, isRouteErrorResponse, Link } from "react-router";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components";
import { Button } from "~/common/components/ui/button";
import ProductPagination from "~/common/components/product-pagination";
import { getProductPagesByDateRange, getProductsByDateRange } from "../queries";
import { PAGE_SIZE } from "../constants";

export const paramsSchema = z.object({
  year: z.coerce.number(), // year을 숫자가 아닌 것으로 변환하려고 할때 오류 발생
  month: z.coerce.number(),
  day: z.coerce.number(),
});

// data는 loader에서 반환한 데이터
export const meta: Route.MetaFunction = ({ params, data }) => {
  const date = DateTime.fromObject({
    year: Number(params.year),
    month: Number(params.month),
    day: Number(params.day),
  });
  return [
    {
      title: `일일 최고 상품, ${date.toLocaleString(DateTime.DATE_MED)} | Wemake`,
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
  const date = DateTime.fromObject(parsedData);
  if (!date.isValid) {
    throw data(
      {
        code: "INVALID_DATE",
        message: "Invalid date",
      },
      { status: 400 }
    );
  }
  const today = DateTime.now().startOf("day");
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
    startDate: date.startOf("day"),
    endDate: date.endOf("day"),
    limit: PAGE_SIZE,
    page: Number(url.searchParams.get("page") ?? 1),
  });

  console.log(products);

  const totalPages = await getProductPagesByDateRange({
    startDate: date.startOf("day"),
    endDate: date.endOf("day"),
  });

  return {
    ...parsedData,
    products,
    totalPages,
  };
};

export default function DailyLeaderboardPage({ loaderData }: Route.ComponentProps) {
  const urlDate = DateTime.fromObject({
    year: loaderData.year,
    month: loaderData.month,
    day: loaderData.day,
  });
  const previousDate = urlDate.minus({ day: 1 });
  const nextDate = urlDate.plus({ day: 1 });
  const isToday = urlDate.hasSame(DateTime.now(), "day");
  return (
    <main className="px-4 py-8 space-y-6">
      <Hero title={`일일 최고 상품, ${urlDate.toLocaleString(DateTime.DATE_MED)}`} />
      <div className="flex justify-center gap-2">
        <Button variant="secondary">
          <Link
            to={`/products/leaderboards/daily/${previousDate.year}/${previousDate.month}/${previousDate.day}`}
          >
            &larr; {previousDate.toLocaleString(DateTime.DATE_MED)}
          </Link>
        </Button>
        {!isToday ? (
          <Button variant="secondary">
            <Link
              to={`/products/leaderboards/daily/${nextDate.year}/${nextDate.month}/${nextDate.day}`}
            >
              {nextDate.toLocaleString(DateTime.DATE_MED)} &rarr;
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

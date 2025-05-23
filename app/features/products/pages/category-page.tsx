import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/category-page";
import ProductPagination from "~/common/components/product-pagination";
import { ProductCard } from "../components";
import { z } from "zod";
import { data } from "react-router";
import { getCategory, getCategoryPages, getProductsByCategory } from "../queries";
export const meta: Route.MetaFunction = () => [
  { title: "Developer Tools | ProductHunt Clone" },
  { name: "description", content: "Tools for developers building with Wemake." },
];

const paramsSchema = z.object({
  category: z.coerce.number(),
});

const searchParamsSchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const { success, data: parsedData } = paramsSchema.safeParse(params);
  const { success: searchParamsSuccess, data: parsedSearchParams } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );

  if (!success) {
    throw data({
      error_code: "INVALID_SEARCH_PARAMS",
      message: "Invalid search params",
    });
  }

  if (!searchParamsSuccess) {
    throw data({
      error_code: "INVALID_SEARCH_PARAMS",
      message: "Invalid search params",
    });
  }

  const category = await getCategory(parsedData.category);
  const products = await getProductsByCategory({
    categoryId: parsedData.category,
    page: parsedSearchParams.page,
  });
  const pages = await getCategoryPages(parsedData.category);
  return {
    category,
    products,
    pages,
  };
};

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
  return (
    <main className="px-4 py-8 space-y-8">
      <Hero title={loaderData.category.name} description={loaderData.category.description} />
      <div className="grid grid-cols-1 gap-4">
        {loaderData.products.map((product) => (
          <ProductCard
            key={product.product_id}
            link={`/products/${product.product_id}`}
            productName={product.name}
            productDescription={product.tagline}
            commentsCount={product.reviews ?? 0}
            viewsCount={product.views ?? 0}
            votesCount={product.upvotes ?? 0}
          />
        ))}
      </div>
      <ProductPagination totalPages={loaderData.pages} />
    </main>
  );
}

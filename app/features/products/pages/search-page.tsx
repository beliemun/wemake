import { z } from "zod";
import type { Route } from "./+types/search-page";
import { Hero } from "~/common/components/hero";
import ProductPagination from "~/common/components/product-pagination";
import { ProductCard } from "..";
import { data, Form } from "react-router";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import { getPagesBySearch, getProductBySearch } from "../queries";
import { makeSsrClient } from "~/supabase-client";

const searchParams = z.object({
  query: z.string().optional().default(""),
  page: z.coerce.number().optional().default(1),
});

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const { success, data: parseData } = searchParams.safeParse(Object.fromEntries(url.searchParams));
  if (!success) {
    throw new Error("Invalid search params");
  }
  if (parseData.query === "") {
    return { products: [], totalPages: 1 };
  }
  const { client } = makeSsrClient(request);
  const products = await getProductBySearch(client, {
    query: parseData.query,
    page: parseData.page,
  });
  const totalPages = await getPagesBySearch(client, { query: parseData.query });
  return { products, totalPages };
}

export function meta() {
  return [{ title: "Search | Wemake" }, { name: "description", content: "Search products" }];
}

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  return (
    <main className="px-4 py-8">
      <Hero title="Search" description="Search products by title or description." />
      <Form className="flex justify-center max-w-[640px] w-full mx-auto gap-4 py-8">
        <Input name="query" />
        <Button type="submit">Search</Button>
      </Form>
      <div className="grid grid-cols-1 gap-4">
        {loaderData.products.map((product) => (
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
      </div>
      <ProductPagination totalPages={loaderData.totalPages} />
    </main>
  );
}

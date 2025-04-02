import { z } from "zod";
import type { Route } from "./+types/search-page";
import { Hero } from "~/common/components/hero";
import ProductPagination from "~/common/components/product-pagination";
import { ProductCard } from "..";
import { Form } from "react-router";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";

const paramsSchema = z.object({
  query: z.string().optional().default(""),
  page: z.coerce.number().optional().default(1),
});

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const parsedData = paramsSchema.parse(Object.fromEntries(url.searchParams));
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
      </div>
      <ProductPagination totalPages={10} />
    </main>
  );
}

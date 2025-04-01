import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/category-page";
import ProductPagination from "~/common/components/product-pagination";
import { ProductCard } from "../components";
import { Form } from "react-router";
import { Button } from "~/common/components/ui/button";
import { Input } from "~/common/components/ui/input";

export const meta: Route.MetaFunction = () => [
  { title: "Developer Tools | ProductHunt Clone" },
  { name: "description", content: "Tools for developers building with Wemake." },
];

export default function CategoryPage() {
  return (
    <main className="px-4 py-8 space-y-8">
      <Hero title="Developer Tools" description="Tools for developers building with Wemake." />
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

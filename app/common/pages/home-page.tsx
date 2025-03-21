import { type MetaFunction } from "react-router";
import { ProductCard } from "~/features/products/components/product-card";

export const meta: MetaFunction = () => {
  return [{ title: "Home | Wemake" }, { name: "Description", content: "Home page" }];
};

export default function HomePage() {
  return (
    <main className="grid grid-cols-3 gap-4">
      <div>
        <h2 className="text-5xl font-bold leading-tight tracking-tight">Today's Products</h2>
        <p className="text-xl font-light text-foreground">
          The best products for our comunty today.
        </p>
      </div>
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
    </main>
  );
}

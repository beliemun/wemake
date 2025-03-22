import { Link, type MetaFunction } from "react-router";
import { ProductCard } from "~/features/products/components/product-card";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { PostCard } from "~/features/posts/components/post-card";
export const meta: MetaFunction = () => {
  return [{ title: "Home | Wemake" }, { name: "Description", content: "Home page" }];
};

export default function HomePage() {
  return (
    <main className="space-y-12">
      <section className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-start gap-2">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground ">
            Today's Products
          </h2>
          <p className="font-light text-foreground">The best products for our comunty today.</p>
          <Button variant="link" asChild>
            <Link to={"/products/leaders-boards"}>View all products &rarr;</Link>
          </Button>
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
      </section>
      <Separator />
      <section className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-start gap-2">
          <h2 className="text-3xl font-bold leading-tight tracking-tight">Today's Posts</h2>
          <p className="font-light text-foreground">The best posts for our community today.</p>
          <Button variant="link" asChild>
            <Link to={"/community/leaders-boards"}>Explore all discussions &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <PostCard
            key={index}
            title="Discussion Title"
            description="Productivity"
            author="Brian"
            date="12 hours ago"
            postId="postId"
          />
        ))}
      </section>
    </main>
  );
}

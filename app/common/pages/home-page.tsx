import { Link, type MetaFunction } from "react-router";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { ProductCard } from "~/features/products";
import { PostCard } from "~/features/posts";
import { IdeaCard } from "~/features/ideas";
import { JobCard } from "~/features/jobs";

import type { Route } from "./+types/home-page";
import { TeamCard } from "~/features/teams";

export const loader = async () => {
  return {
    hello: "world",
  };
};

export const meta: MetaFunction = () => {
  return [{ title: "Home | Wemake" }, { name: "Description", content: "Home page" }];
};

export default function HomePage({ loaderData }: Route.ComponentProps) {
  return (
    <main className="space-y-12">
      <section className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-start gap-2">
          <h2 className="text-foreground text-3xl font-bold leading-tight tracking-tight">
            Today's Products
          </h2>
          <p className="font-light text-foreground">The best products for our community today.</p>
          <Button variant="secondary" asChild>
            <Link to={"/products/leaders-boards"}>View all products &rarr;</Link>
          </Button>
        </div>
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
      </section>
      <Separator />
      <section className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-start gap-2">
          <h2 className="text-foreground text-3xl font-bold leading-tight tracking-tight">
            Today's Posts
          </h2>
          <p className="font-light text-foreground">The best posts for our community today.</p>
          <Button variant="secondary" asChild>
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
      <Separator />
      <section className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-start gap-2">
          <h2 className="text-foreground text-3xl font-bold leading-tight tracking-tight">
            IdeasGPT
          </h2>
          <p className="font-light text-foreground">Find ideas for your next project.</p>
          <Button variant="secondary" asChild>
            <Link to={"/idears"}>Explore all ideas &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <IdeaCard
            key={index}
            content="A startup that creates AI-powered tools for the future, using the latest in AI technology. and we are looking for a co-founder to join us. for more info, please visit our website. so if you are interested, please contact us. also, we are looking for a co-founder to join us. for more info, please visit our website. so if you are interested, please contact us."
            viewCount={123}
            date="12 hours ago"
            likeCount={12}
            ideaId="ideaId"
            claimed={index % 2 === 0}
          />
        ))}
      </section>
      <Separator />
      <section className="grid grid-cols-4 gap-4">
        <div className="flex flex-col items-start gap-2">
          <h2 className="text-foreground text-3xl font-bold leading-tight tracking-tight">
            Latest Jobs
          </h2>
          <p className="font-light text-foreground">Find the latest jobs for our community.</p>
          <Button variant="secondary" asChild>
            <Link to={"/jobs"}>Explore all jobs &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <JobCard
            key={index}
            companyLogo="https://github.com/facebook.png"
            companyName="Meta"
            postedDate="12 hours ago"
            badges={["Full-time", "Remote", "Senior"]}
            title="Software Engineer"
            salary="$100,000 - $120,000"
            location="San Francisco, CA"
            jobId="jobId"
          />
        ))}
      </section>
      <Separator />
      <section className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-start gap-2">
          <h2 className="text-foreground text-3xl font-bold leading-tight tracking-tight">
            Find a team mate
          </h2>
          <p className="font-light text-foreground">Join a team looking for a new member.</p>
          <Button variant="link" asChild>
            <Link to={"/teams"}>Explore all teams &rarr;</Link>
          </Button>
        </div>

        {Array.from({ length: 10 }).map((_, index) => (
          <TeamCard
            key={index}
            username="brian"
            userAvatar="https://github.com/shadcn.png"
            userInitial="B"
            position={["React Developer", "Frontend Developer", "Backend Developer"]}
            description="to build a new social media platform."
            teamId="teamId"
          />
        ))}
      </section>
    </main>
  );
}

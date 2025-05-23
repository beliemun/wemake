import { Link, type MetaFunction } from "react-router";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { ProductCard } from "~/features/products";
import { PostCard } from "~/features/posts";
import { IdeaCard } from "~/features/ideas";
import { JobCard } from "~/features/jobs";

import type { Route } from "./+types/home-page";
import { TeamCard } from "~/features/teams";
import { getProductsByDateRange } from "~/features/products/queries";
import { DateTime } from "luxon";
import { getPosts } from "~/features/community/queries";
import { getGptIdeas } from "~/features/ideas/queries";
import { getJobs } from "~/features/jobs/queries";
import { getTeams } from "~/features/teams/queries";

export const meta: MetaFunction = () => {
  return [{ title: "Home | Wemake" }, { name: "Description", content: "Home page" }];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const products = await getProductsByDateRange({
    startDate: DateTime.now().startOf("day"),
    endDate: DateTime.now().endOf("day"),
    limit: 7,
    page: 1,
  });
  const posts = await getPosts({ limit: 10, sorting: "newest", period: "all" });
  const gptIdeas = await getGptIdeas({ limit: 10 });
  const jobs = await getJobs({ limit: 11 });
  const teams = await getTeams({ limit: 10 });
  return { products, posts, gptIdeas, jobs, teams };
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
            <Link to={"/products/leaderboards"}>View all products &rarr;</Link>
          </Button>
        </div>
        {loaderData.products.map((product, index) => (
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
      </section>
      <Separator />
      <section className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-start gap-2">
          <h2 className="text-foreground text-3xl font-bold leading-tight tracking-tight">
            Latest Discussions
          </h2>
          <p className="font-light text-foreground">The best posts for our community today.</p>
          <Button variant="secondary" asChild>
            <Link to={"/community"}>Explore all discussions &rarr;</Link>
          </Button>
        </div>
        {loaderData.posts.map((post, index) => (
          <PostCard
            key={post.post_id}
            title={post.title}
            content={post.content}
            author={post.author}
            date={post.created_at}
            postId={post.post_id}
            avatar={post.author_avatar}
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
            <Link to={"/ideas"}>Explore all ideas &rarr;</Link>
          </Button>
        </div>
        {loaderData.gptIdeas.map((idea, index) => (
          <IdeaCard
            key={idea.gpt_idea_id}
            content={idea.idea}
            viewCount={idea.views}
            date={DateTime.fromISO(idea.created_at).toRelative()}
            likeCount={idea.likes}
            ideaId={idea.gpt_idea_id.toString()}
            claimed={idea.is_claimed}
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
        {loaderData.jobs.map((job, index) => (
          <JobCard
            key={job.job_id}
            companyLogo={job.company_logo}
            companyName={job.company_name}
            postedDate={DateTime.fromISO(job.created_at).toRelative()}
            badges={["Full-time", "Remote", "Senior"]}
            title={job.position}
            salary={job.salary_range}
            location={job.location}
            jobId={job.job_id.toString()}
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
            <Link to={"/teams"} prefetch="viewport">
              Explore all teams &rarr;
            </Link>
          </Button>
        </div>
        {loaderData.teams.map((team, index) => (
          <TeamCard
            key={team.team_id}
            username={team.team_leader.username}
            avatar={team.team_leader.avatar}
            userInitial={team.team_leader.username[0]}
            position={team.roles.split(",")}
            description={team.product_description}
            teamId={team.team_id.toString()}
          />
        ))}
      </section>
    </main>
  );
}

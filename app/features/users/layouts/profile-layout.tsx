import { Form, Link, NavLink, Outlet } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Button, buttonVariants } from "~/common/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/common/components/ui/dialog";
import { Textarea } from "~/common/components/ui/textarea";
import { cn } from "~/lib/utils";
import type { Route } from "./+types/profile-layout";
import { getUserProfile } from "../quries";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { username } = params;
  const user = await getUserProfile({ username: username as string });
  console.log(user);
  return { user };
};

export default function ProfileLayout({ loaderData }: Route.ComponentProps) {
  console.log(JSON.stringify(loaderData, null, 2));
  return (
    <div className="space-y-8">
      <div className="flex flex-row items-center gap-4">
        <Avatar className="h-24 w-24">
          {loaderData.user.avatar ? (
            <AvatarImage src={loaderData.user.avatar} />
          ) : (
            <AvatarFallback>CN</AvatarFallback>
          )}
        </Avatar>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <h1 className="text-2xl font-bold text-foreground">{loaderData.user.name}</h1>
            <Button variant="default" className="cursor-pointer" asChild>
              <Link to="/my/settings">Edit Profile</Link>
            </Button>
            <Button variant="default" className="cursor-pointer">
              Follow
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="cursor-pointer">
                  Send Message
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Send Message</DialogTitle>
                </DialogHeader>
                <DialogDescription>Send a message to John Doe</DialogDescription>
                <Form className="space-y-2">
                  <Textarea placeholder="Message" className="resize-none" rows={4} />
                </Form>
                <DialogFooter>
                  <Button type="submit">Send</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-row gap-2">
            <span className="text-sm text-muted-foreground">@{loaderData.user.username}</span>
            <Badge variant="secondary">
              <span className="text-xs">{loaderData.user.role}</span>
            </Badge>
            <Badge variant="secondary">
              <span className="text-xs">100 followers</span>
            </Badge>
            <Badge variant="secondary">
              <span className="text-xs">100 following</span>
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        {[
          { label: "About", to: `/users/${loaderData.user.username}` },
          { label: "Posts", to: `/users/${loaderData.user.username}/posts` },
          { label: "Products", to: `/users/${loaderData.user.username}/products` },
        ].map((item) => (
          <NavLink
            key={item.label}
            className={({ isActive }) =>
              cn(buttonVariants({ variant: isActive ? "default" : "secondary" }))
            }
            to={item.to}
            end
          >
            {item.label}
          </NavLink>
        ))}
      </div>
      <Outlet context={{ headline: loaderData.user.headline, bio: loaderData.user.bio }} />
    </div>
  );
}

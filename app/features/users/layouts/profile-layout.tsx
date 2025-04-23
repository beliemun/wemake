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

export default function ProfileLayout() {
  return (
    <div className="space-y-8">
      <div className="flex flex-row items-center gap-4">
        <Avatar className="h-24 w-24">
          <AvatarFallback>CN</AvatarFallback>
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <h1 className="text-2xl font-bold text-foreground">John Doe</h1>
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
            <span className="text-sm text-muted-foreground">@john_doe</span>
            <Badge variant="secondary">
              <span className="text-xs">Product Manager</span>
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
          { label: "About", to: "/users/username" },
          { label: "Posts", to: "/users/username/posts" },
          { label: "Products", to: "/users/username/products" },
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
      <Outlet />
    </div>
  );
}

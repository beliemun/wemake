import { Link } from "react-router";
import { cn } from "~/lib/utils";
import { Separator } from "./ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { BarChart3, BellIcon, LogOut, MessageCircleIcon, Settings, UserIcon } from "lucide-react";

const menus = [
  {
    name: "Products",
    to: "/products",
    items: [
      {
        name: "Leaderboards",
        description: "View the leaderboard of the most popular products in your community.",
        to: "/products/leaderboards",
      },
      {
        name: "Categories",
        description: "View the categories of the products in your community.",
        to: "/products/categories",
      },
      {
        name: "Search",
        description: "Search for a product in your community.",
        to: "/products/search",
      },
      {
        name: "Submit a Product",
        description: "Submit a product in your community.",
        to: "/products/submit",
      },
      {
        name: "Promote",
        description: "Promote a product in your community.",
        to: "/products/promote",
      },
    ],
  },
  {
    name: "Jobs",
    to: "/jobs",
    items: [
      {
        name: "Remote Jobs",
        description: "View the remote jobs in your community.",
        to: "/jobs?location=remote",
      },
      {
        name: "Full-Time Jobs",
        description: "View the full-time jobs in your community.",
        to: "/jobs?type=full-time",
      },
      {
        name: "Freelance Jobs",
        description: "View the freelance jobs in your community.",
        to: "/jobs?type=freelance",
      },
      {
        name: "Internships",
        description: "View the internships in your community.",
        to: "/jobs?type=internship",
      },
      {
        name: "Submit a Job",
        description: "Submit a job in your community.",
        to: "/jobs/submit",
      },
    ],
  },
  {
    name: "Community",
    to: "/community",
    items: [
      {
        name: "All Posts",
        description: "View all posts in your community.",
        to: "/community",
      },
      {
        name: "Top Posts",
        description: "View the top posts in your community.",
        to: "/community?sort=top",
      },
      {
        name: "Submit a Post",
        description: "Submit a post in your community.",
        to: "/community/submit",
      },
    ],
  },
  {
    name: "IdeasGPT",
    to: "/ideasgpt",
  },
  {
    name: "Teams",
    to: "/teams",
    items: [
      {
        name: "All Teams",
        description: "View all teams in your community.",
        to: "/teams",
      },
      {
        name: "Create a Team",
        description: "Create a team in your community.",
        to: "/teams/create",
      },
    ],
  },
];

const Navigation = ({
  isSignedIn,
  hasNotifications,
  hasMessages,
}: {
  isSignedIn: boolean;
  hasNotifications: boolean;
  hasMessages: boolean;
}) => {
  return (
    <nav
      className={cn(
        "flex items-center justify-between px-20 h-16 border-b backdrop-blur",
        "fixed top-0 left-0 right-0 z-50 bg-background/50"
      )}
    >
      <div>
        <Link to="/" className="text-2xl font-bold">
          wemake
        </Link>
      </div>
      <>
        <NavigationMenu>
          <NavigationMenuList className="gap-4">
            {menus.map((menu) => (
              <NavigationMenuItem key={menu.name}>
                {menu.items ? (
                  <div>
                    <Link to={menu.to}>
                      <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
                    </Link>
                    <NavigationMenuContent>
                      <ul className="grid grid-cols-2 gap-4 p-2 w-[500px]">
                        {menu.items?.map((item) => (
                          <NavigationMenuLink key={item.name} className="row-span-3" asChild>
                            <Link to={item.to} className="block p-3 hover:bg-accent rounded-md">
                              <div className="text-sm font-medium">{item.name}</div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {item.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </div>
                ) : (
                  <Link to={menu.to} className={navigationMenuTriggerStyle()}>
                    {menu.name}
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </>
      {isSignedIn ? (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Link to="/my/notifications">
              <BellIcon />
              {hasNotifications && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <Link to="/my/messages">
              <MessageCircleIcon />
              {hasMessages && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/shadcasdasdn.png" />
                <AvatarFallback>N</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col w-64 gap-2">
              <DropdownMenuLabel className="flex flex-col">
                <span className="font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">john.doe@example.com</span>
              </DropdownMenuLabel>
              <Separator />
              <DropdownMenuGroup className="flex flex-col gap-2">
                <DropdownMenuItem asChild>
                  <Link to="/my/dashboard">
                    <BarChart3 />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/my/profile">
                    <UserIcon />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/my/settings">
                    <Settings />
                    Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <Separator />
              <DropdownMenuItem asChild>
                <Link to="/sign-out">
                  <LogOut />
                  Sign Out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <Link to="/login">Login</Link>
          </Button>
          <Button variant="default">
            <Link to="/signup">Signup</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

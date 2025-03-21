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

const Navigation = ({ isSignedIn = false }: { isSignedIn?: boolean }) => {
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
                  <>
                    <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid grid-cols-2 gap-4 p-4 w-[500px] bg-popover">
                        {menu.items?.map((item) => (
                          <li key={item.name}>
                            <NavigationMenuLink asChild>
                              <Link to={item.to} className="block p-3 hover:bg-accent rounded-md">
                                <div className="text-sm font-medium">{item.name}</div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {item.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link to={menu.to} className={navigationMenuTriggerStyle()}>
                      {menu.name}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </>

      <div className="flex items-center gap-4">
        {isSignedIn ? (
          <Button variant="link" asChild>
            <Link to="/dashboard">대시보드</Link>
          </Button>
        ) : (
          <>
            <Button variant="link" asChild>
              <Link to="/login">로그인</Link>
            </Button>
            <Button className="btn-primary" asChild>
              <Link to="/signup">회원가입</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

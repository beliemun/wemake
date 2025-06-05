import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useNavigation,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import Navigation from "./common/components/navigation";
import { Settings } from "luxon";
import { cn } from "./lib/utils";
import { makeSsrClient } from "./supabase-client";
import { getUserById } from "./features/users/queries";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  Settings.defaultLocale = "ko";
  Settings.defaultZone = "Asia/Seoul";
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSsrClient(request);
  const {
    data: { user },
  } = await client.auth.getUser();
  if (user) {
    const profile = await getUserById({ id: user.id, request });
    return { user, profile };
  }
  return { user, profile: null };
};

export default function App({ loaderData }: Route.ComponentProps) {
  const { pathname } = useLocation();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const { user, profile } = loaderData;
  const isSignedIn = !!user;

  return (
    <main
      className={cn({
        "pt-16": !pathname.includes("/aut h"),
        "transition-opacity animate-pulse": isLoading,
      })}
    >
      <div>
        {pathname.includes("/auth") ? null : (
          <Navigation
            isSignedIn={!!user}
            hasNotifications={true}
            hasMessages={true}
            name={profile?.name ?? ""}
            username={profile?.username ?? ""}
            avatar={profile?.avatar ?? ""}
          />
        )}
      </div>
      <div className="flex justify-center">
        <div
          className={cn(
            "max-w-[1280px] w-full min-h-[calc(100vh-64px)]",
            pathname.includes("/auth") ? "" : "px-20 py-10"
          )}
        >
          <Outlet
            context={{
              isSignedIn,
              name: profile?.name,
              username: profile?.username,
              avatar: profile?.avatar,
            }}
          />
        </div>
      </div>
    </main>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

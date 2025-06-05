import { Link, Outlet } from "react-router";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
} from "~/common/components/ui/sidebar";
import { SidebarContent } from "~/common/components/ui/sidebar";
import { Sidebar } from "~/common/components/ui/sidebar";
import { SidebarProvider } from "~/common/components/ui/sidebar";
import { HomeIcon, LightbulbIcon, PackageIcon } from "lucide-react";
import { useLocation } from "react-router";
import { makeSsrClient } from "~/supabase-client";
import type { Route } from "./+types/dashboard-layout";
import { getProductsByUserId, getSignedInUserId } from "../queries";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSsrClient(request);
  const userId = await getSignedInUserId(client);
  const products = await getProductsByUserId(client, { userId });
  return { userId, products };
};

export default function DashboardLayout({ loaderData }: Route.ComponentProps) {
  const location = useLocation();
  return (
    <SidebarProvider>
      <Sidebar className="pt-16" variant="floating">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuButton
                className="flex flex-row items-center gap-4"
                isActive={location.pathname === "/my/dashboard"}
                asChild
              >
                <Link to="my/dashboard">
                  <HomeIcon />
                  <span className="text-sm text-muted-foreground">홈</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton
                className="flex flex-row items-center gap-4"
                isActive={location.pathname === "/my/dashboard/ideas"}
                asChild
              >
                <Link to="my/dashboard/ideas">
                  <LightbulbIcon />
                  <span className="text-sm text-muted-foreground">아이디어</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>
              <span className="text-sm text-muted-foreground">제품 분석</span>
            </SidebarGroupLabel>
            <SidebarMenu>
              {loaderData.products.map((product) => (
                <SidebarMenuButton
                  key={product.product_id}
                  className="flex flex-row items-center gap-4"
                  isActive={location.pathname === `/my/dashboard/products/${product.product_id}`}
                  asChild
                >
                  <Link to={`/my/dashboard/products/${product.product_id}`}>
                    <PackageIcon />
                    <span className="text-sm text-muted-foreground">{product.name}</span>
                  </Link>
                </SidebarMenuButton>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="size-full">
        <Outlet />
      </div>
    </SidebarProvider>
  );
}

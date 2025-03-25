import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
  index("common/pages/home-page.tsx"),
  ...prefix("product", [
    index("features/products/pages/products-page/index.ts"),
    ...prefix("leaderboards", [
      index("features/products/pages/leaderboard-page/index.ts"),
      route("/yearly/:year", "features/products/pages/yearly-leaderboard-page/index.ts"),
      route("/monthly/:year/:month", "features/products/pages/monthly-leaderboard-page/index.ts"),
      route("/daily/:year/:month/:day", "features/products/pages/daily-leaderboard-page/index.ts"),
      route("/weekly/:year", "features/products/pages/weekly-leaderboard-page/index.ts"),
    ]),
    ...prefix("categories", [
      index("features/products/pages/categories-page/index.ts"),
      route("/:category", "features/products/pages/category-page/index.ts"),
    ]),
    route("/search", "features/products/pages/search-page/index.ts"),
    route("/submit", "features/products/pages/submit-page/index.ts"),
    route("/promote", "features/products/pages/promote-page/index.ts"),
  ]),
] satisfies RouteConfig;

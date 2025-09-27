import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("../pages/Home.tsx"), route("oauth", "../pages/oauth/Callback.tsx"), route("playlists", "../pages/Playlists.tsx")] satisfies RouteConfig;

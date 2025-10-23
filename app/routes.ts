import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("../pages/home/Home.tsx"), route("oauth", "../pages/oauth/Callback.tsx"), route("playlists", "../pages/playlists/Playlists.tsx"), route("tracks", "../pages/tracks/Tracks.tsx")] satisfies RouteConfig;

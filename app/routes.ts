import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("../routes/home/Home.tsx"), route("oauth", "../routes/oauth/Callback.tsx"), route("playlists", "../routes/playlists/Playlists.tsx"), route("tracks", "../routes/tracks/Tracks.tsx")] satisfies RouteConfig;

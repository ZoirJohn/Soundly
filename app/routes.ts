import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [index('routes/Home.tsx'), route('oauth', 'routes/oauth/Callback.tsx'), route('playlists', 'routes/Playlists.tsx')] satisfies RouteConfig;

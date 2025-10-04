"use server";
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { Route } from "./+types/root";
import "./app.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "shared/components/Header";
import Sidebar from "shared/components/Sidebar";

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

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60 * 1000,
			refetchOnReconnect: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			gcTime: 1000 * 10,
		},
	},
});

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<Meta />
				<Links />
				<title>Soundly</title>
			</head>
			<body>
				<div
					id="wrapper"
					className="justify-center bg-background min-h-screen"
				>
					<div className="grid grid-cols-[300px_auto] grid-rows-[70px_1fr] min-h-screen">
						<QueryClientProvider client={queryClient}>
						<Header />
							<main className="px-13 col-start-2 col-end-3 row-start-2 row-end-3">{children}</main>
							<ReactQueryDevtools initialIsOpen={false} />
						<Sidebar />
						</QueryClientProvider>
					</div>
				</div>
				<Scripts />
				<ScrollRestoration />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main className="mx-auto p-4 pt-16 container">
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className="p-4 w-full overflow-x-auto">
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
}

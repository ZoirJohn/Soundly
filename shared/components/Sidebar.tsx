import { NavLink } from "react-router";
import { NAV_LINKS } from "shared/consts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "entities/api/client";
import Button from "./ui/button";
import { useMeQuery } from "shared/hooks/useMeQuery";

export default function Sidebar() {
	const queryClient = useQueryClient();
	const { data, isLoading } = useMeQuery();
	const callbackUrl = "http://localhost:5173/oauth";
	const mutation = useMutation({
		mutationFn: async ({ code }: { code: string }) => {
			const response = await client.POST("/auth/login", {
				body: {
					code,
					redirectUri: callbackUrl,
					rememberMe: true,
					accessTokenTTL: "1d",
				},
			});
			if (response.error) {
				throw new Error(response.error.message);
			}
			return response.data;
		},
		onSuccess: (data) => {
			if (!data) {
				throw new Error("Invalid Response");
			}
			localStorage.setItem("musicfunapi-accessToken", data.accessToken);
			localStorage.setItem("musicfunapi-refreshToken", data.refreshToken);
			queryClient.invalidateQueries({
				queryKey: ["auth", "me"],
			});
		},
	});
	const handleLogin = () => {
		window.addEventListener("message", handleOauthMessage);
		window.open(`${import.meta.env.VITE_BASE_URL}/auth/oauth-redirect?callbackUrl=${callbackUrl}`, "apihub-oauth2", "width=500,height=600");
	};
	const handleOauthMessage = (event: MessageEvent) => {
		window.removeEventListener("message", handleOauthMessage);
		if (event.origin !== window.location.origin) {
			console.warn("Origin did not match");
			return;
		}
		const code = event.data.code;
		if (!code) {
			console.warn("No code in message");
			return;
		}
		mutation.mutate({ code });
	};
	return (
		<aside className="flex flex-col gap-y-8 col-start-1 col-end-2 row-start-1 row-end-3 bg-[#212124] px-3 py-4">
			<div className="p-3 flex justify-between items-center">
				{isLoading ? (
					<div className="h-6"></div>
				) : data?.userId ? (
					<>
						<div className="size-6 bg-accent rounded-full"></div>
						<div className="w-4 h-1 bg-accent"></div>
					</>
				) : (
					<Button onClick={handleLogin}>Login</Button>
				)}
			</div>
			<nav>
				<ul>
					{Object.entries(NAV_LINKS).map(([name, href]) => (
						<li key={href}>
							<NavLink
								className={({ isActive }) => `${isActive ? "text-active" : "text-white"} block p-3 hover:bg-hover rounded-md transition`}
								to={"/" + href}
							>
								{name.replace(/^./, (match) => match.toUpperCase())}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>
			<ul>
				<h6 className="text-xs uppercase text-grayText">MY COLLECTION</h6>
				<li className="p-3"></li>
			</ul>
		</aside>
	);
}

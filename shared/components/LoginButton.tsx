import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "./ui/button";
import { client } from "entities/api/client";

export default function LoginButton() {
	const queryClient = useQueryClient();
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
	return <Button onClick={handleLogin}>Sign In</Button>;
}

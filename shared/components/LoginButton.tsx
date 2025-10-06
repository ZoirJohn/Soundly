import Button from "./ui/button";
import useLoginMutation from "shared/hooks/useLoginMutation";

export default function LoginButton() {
	const callbackUrl = "http://localhost:5173/oauth";
	const mutation = useLoginMutation(callbackUrl);
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

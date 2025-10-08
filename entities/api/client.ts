import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "./schema";

const rotateKeys = () => {};

const authMiddleware: Middleware = {
	async onRequest({ request }) {
		const accessToken = localStorage.getItem("musicfunapi-accessToken");
		if (accessToken) {
			request.headers.set("Authorization", "Bearer " + accessToken);
		}
		return request;
	},
};

export const client = createClient<paths>({
	baseUrl: import.meta.env.VITE_BASE_URL,
	headers: {
		"api-key": import.meta.env.VITE_API_KEY,
	},
});

client.use(authMiddleware);

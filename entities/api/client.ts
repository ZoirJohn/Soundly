import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "./schema";

let refreshTokenPromise: Promise<void> | null;
function refreshToken() {
	if (!refreshTokenPromise) {
		refreshTokenPromise = (async () => {
			const token = localStorage.getItem("musicfunapi-refreshToken");
			if (!token) throw new Error("There is no refresh token");

			const response = await fetch(import.meta.env.VITE_BASE_URL + "/auth/refresh", { method: "POST", headers: { "Content-Type": "application/json", "api-key": import.meta.env.VITE_API_KET }, body: JSON.stringify({ refreshToken: import.meta.env.VITE_API_KEY }) });

			if (!response.ok) {
				localStorage.removeItem("musicfunapi-accessToken");
				localStorage.removeItem("musicfunapi-refreshToken");
				throw new Error("Failed to refresh auth token");
			}
			// if () {
			// 	localStorage.setItem("musicfunapi-accessToken", data.accessToken);
			// 	localStorage.setItem("musicfunapi-refreshToken", data.refreshToken);
			// }
		})();
		refreshTokenPromise.finally(() => {
			refreshTokenPromise = null;
		});
		return refreshTokenPromise;
	}
}

const authMiddleware: Middleware = {
	async onRequest({ request }) {
		const accessToken = localStorage.getItem("musicfunapi-accessToken");
		if (accessToken) {
			request.headers.set("Authorization", "Bearer " + accessToken);
		}
		return request;
	},
	async onResponse({ request, response }) {
		if (response.ok) return;
		if (!response.ok && response.status !== 401) {
			throw new Error(`${response.url} ${response.statusText} ${response.status}`);
		}

		try {
			await refreshToken();
			const originalRequest = request._retryRequest;
			const retryRequest = new Request(originalRequest, { headers: new Headers(originalRequest.headers) });
			retryRequest.headers.set("Authorization", "Bearer " + localStorage.getItem("musicfunapi-accessToken"));
		} catch (error) {}
	},
};

export const client = createClient<paths>({
	baseUrl: import.meta.env.VITE_BASE_URL,
	headers: {
		"api-key": import.meta.env.VITE_API_KEY,
	},
});

client.use(authMiddleware);

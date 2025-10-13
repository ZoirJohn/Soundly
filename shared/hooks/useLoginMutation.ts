import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMeQuery } from "./useMeQuery";
import { client } from "entities/api/client";

export default function useLoginMutation(callbackUrl: string) {
	const { data } = useMeQuery();
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: async ({ code }: { code: string }) => {
			const response = await client.POST("/auth/login", {
				body: {
					code,
					redirectUri: callbackUrl,
					rememberMe: true,
					accessTokenTTL: "10s",
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
	return mutation;
}

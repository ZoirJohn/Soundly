import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "entities/api/client";

export default function useLogoutMutation() {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: async () => {
			const response = await client.POST("/auth/logout", {
				body: {
					refreshToken: localStorage.getItem("musicfunapi-refreshToken")!,
				},
			});
			return response.data;
		},
		onSuccess: () => {
			localStorage.removeItem("musicfunapi-accessToken");
			localStorage.removeItem("musicfunapi-refreshToken");
			queryClient.resetQueries({
				queryKey: ["auth", "me"],
			});
		},
	});
	return mutation;
}

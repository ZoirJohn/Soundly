import { useQuery } from "@tanstack/react-query";
import { client } from "entities/api/client";

export function useMeQuery() {
	const data = useQuery({
		queryKey: ["auth", "me"],
		queryFn: async () => {
			const response = await client.GET("/auth/me");
			return response.data;
		},
	});
	return data;
}

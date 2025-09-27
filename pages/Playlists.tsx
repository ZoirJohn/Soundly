import { useQuery } from "@tanstack/react-query";
import { client } from "shared/api/client";

export default function Playlists() {
	// const { data, isLoading, isFetched } = useQuery({
	// 	queryKey: ["playlists"],
	// 	queryFn: async () => (await client.GET("/playlists")).data,
	// });
	// const isDataLoaded = !isLoading && isFetched && data?.data.length;
	// const isDataEmpty = !isLoading && isFetched && (data?.data.length || 0) == 0;

	return (
		<div className="max-w-7xl dark mx-auto">
			
		</div>
	);
}

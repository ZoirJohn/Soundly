import { useQuery } from "@tanstack/react-query";
import { client } from "shared/api/client";
import { AlbumCard, AlbumCardSkeleton } from "shared/components/ui/albumCard";

export default function Home() {
	const { data } = useQuery({
		queryKey: ["playlists"],
		queryFn: async () =>
			(
				await client.GET("/playlists", {
					params: {
						query: {
							pageSize: 4,
						},
					},
				})
			).data,
	});
	return (
		<section className="max-w-7xl mx-auto mt-7">
			<h4 className="rowTitle">Albums</h4>
			<article className="flex flex-wrap gap-6">
				{data?.data.map(({ attributes,id }) => (
					<AlbumCard
						title={attributes.title}
						description={attributes.description || ""}
						key={id}
					/>
				))}
				<AlbumCardSkeleton />
			</article>
		</section>
	);
}

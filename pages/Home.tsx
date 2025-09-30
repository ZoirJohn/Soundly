import { useQuery } from "@tanstack/react-query";
import { client } from "shared/api/client";
import { AlbumCard, AlbumCardSkeleton } from "shared/components/ui/albumCard";

export default function Home() {
	const { data, isLoading } = useQuery({
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
	const albums = data?.data.length ? data.data : [];
	const skeletons = Array(4).fill(0);
	return (
		<section className="max-w-7xl mx-auto mt-7">
			<div>
				<h4 className="rowTitle">{"Albums"}</h4>
				<div>
					<div></div>
				</div>
			</div>

			<article className="flex flex-wrap gap-6">
				{isLoading
					? skeletons.map((element, idx) => <AlbumCardSkeleton key={element + idx} />)
					: albums.map(({ attributes, id }) => {
							return (
								<AlbumCard
									title={attributes.title}
									description={attributes.description || ""}
									titleColor="red"
									img={attributes.images.main?.length ? attributes.images.main[0].url : "/assets/images/background2.png"}
									key={id}
								/>
							);
					  })}
			</article>
		</section>
	);
}

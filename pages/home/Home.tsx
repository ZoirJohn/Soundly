import { useQuery } from "@tanstack/react-query";
import { client } from "entities/api/client";
import { Link } from "react-router";
import { AlbumCard, AlbumCardSkeleton } from "shared/components/ui/albumCard";
import PageButton from "shared/components/ui/pageButton";

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
		<section className="mx-auto mt-7 max-w-7xl">
			<div className="flex flex-wrap justify-between items-center gap-6 mb-4">
				<h4 className="rowTitle">{"Albums"}</h4>
				<div className="flex gap-2">
					<PageButton size="sm">
						<img
							src="/assets/icons/arrow.svg"
							alt="button-arrow-icon"
							className="ml-2 h-2.5"
						/>
					</PageButton>
					<PageButton size="sm">
						<img
							src="/assets/icons/arrow.svg"
							alt="button-arrow-icon"
							className="ml-2 h-2.5 rotate-180"
						/>
					</PageButton>
				</div>
			</div>

			<article className="flex flex-row flex-wrap gap-6">
				{isLoading
					? skeletons.map((element, idx) => <AlbumCardSkeleton key={element + idx} />)
					: albums.map(({ attributes, id }) => {
							return (
								<Link
									to={"/playlists"}
									key={id}
								>
									<AlbumCard
										title={attributes.title}
										description={attributes.description || ""}
										titleColor="red"
										img={attributes.images.main?.length ? attributes.images.main[0].url : "assets/images/background1.png"}
										key={id}
									/>
								</Link>
							);
					  })}
			</article>
		</section>
	);
}

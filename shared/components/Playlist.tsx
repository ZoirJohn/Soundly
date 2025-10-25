import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "entities/api/client";
import { AlbumCard, AlbumCardSkeleton } from "./ui/albumCard";
import { useState } from "react";
import PlaylistForm from "./PlaylistForm";

export default function Playlist({ userId }: { userId?: string }) {
	const [{ playlistId, isOpen }, setOpenPlaylistId] = useState<{ playlistId?: string; isOpen: boolean }>({ playlistId: "", isOpen: false });
	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery({
		queryKey: ["playlists", userId],
		queryFn: async () => {
			const response = await client.GET("/playlists", {
				params: {
					query: {
						pageSize: 4,
						userId,
					},
				},
			});
			return response.data;
		},
	});
	const mutation = useMutation({
		mutationFn: async (id: string) => {
			const response = await client.DELETE(`/playlists/{playlistId}`, {
				params: {
					path: {
						playlistId: id,
					},
				},
			});
			return response.data;
		},
		onSuccess: (_, id) => queryClient.invalidateQueries(),
	});
	const albums = data?.data.length ? data.data : [];
	const skeletons = Array(4).fill(0);
	return (
		<>
			{isOpen && playlistId ? (
				<PlaylistForm
					header="Edit a playlist"
					playlistId={playlistId}
				/>
			) : isOpen ? (
				<PlaylistForm
					header="Edit a playlist"
					playlistId=""
				/>
			) : (
				<article className="flex flex-row flex-wrap gap-6 items-center">
					{isLoading
						? skeletons.map((element, idx) => <AlbumCardSkeleton key={element + idx} />)
						: albums.map(({ attributes, id }) => {
								return (
									<AlbumCard
										title={attributes.title}
										description={attributes.description || ""}
										titleColor="red"
										img={attributes.images.main?.length ? attributes.images.main[0].url : "assets/images/background1.png"}
										key={id}
										id={id}
										isOwn={!!userId}
										mutation={mutation}
										handleFormState={() => setOpenPlaylistId({ isOpen: true, playlistId: id })}
									/>
								);
						  })}
					{userId && (
						<button
							onClick={() => setOpenPlaylistId({ isOpen: true })}
							className="size-10 bg-darkBackground border border-borderColor flex justify-center items-center rounded-full cursor-pointer hover:bg-darkBackgroundHover transition text-xl"
						>
							+
						</button>
					)}
				</article>
			)}
		</>
	);
}

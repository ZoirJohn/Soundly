import type { MutationFunction, UseMutationResult } from "@tanstack/react-query";

export function AlbumCard({ title, description, titleColor, img, isOwn, mutation, id, handleFormState }: AlbumCard & { isOwn: boolean; mutation: UseMutationResult<void, Error, string>; handleFormState?: () => void }) {
	const handleDelete = (id: string) => {
		mutation.mutate(id);
	};
	return (
		<article className="group relative flex flex-col shadow-2xl shadow-black rounded-xl ring-black/20 hover:ring-10 max-w-albumCardWidth md:h-full min-h-albumCardHeight max-md:min-h-[300px] transition duration-300">
			<div className="rounded-t-xl overflow-hidden">
				<img
					src={img}
					alt="album-background"
					className="w-albumCardWidth h-albumCardHeight"
				/>
			</div>
			<div
				className="flex bg-cover bg-center backdrop-blur-2xl rounded-b-xl overflow-hidden grow"
				style={{ backgroundImage: `url(${img})` }}
			>
				<div className="bg-black/20 backdrop-blur-xl p-4 grow">
					{titleColor == "red" ? <h6 className="md:mb-2 text-pinkRed uppercase">New For You</h6> : <h6 className="text-greenBlue uppercase">New For You</h6>}
					<h5>{title}</h5>
					<p className="font-semibold text-sm albumCardDesc">{description}</p>
				</div>
			</div>
			<button className="right-4 bottom-19 md:bottom-25 xl:bottom-24 xl:group-hover:bottom-25 absolute flex justify-center items-center bg-white opacity-100 xl:group-hover:opacity-100 xl:opacity-0 rounded-full size-10 transition-all duration-350 group-hover:cursor-pointer">
				<img
					className="size-4"
					src="assets/icons/play.svg"
					alt="play-icon"
				/>
			</button>
			{isOwn && (
				<>
					<button
						className="right-18 bottom-19 md:bottom-25 xl:bottom-24 xl:group-hover:bottom-25 absolute flex justify-center items-center bg-white opacity-100 xl:group-hover:opacity-100 xl:opacity-0 rounded-full size-10 transition-all duration-350 delay-100 group-hover:cursor-pointer"
						onClick={() => handleDelete(id)}
					>
						<img
							className="size-4"
							src="assets/icons/trashcan.svg"
							alt="play-icon"
						/>
					</button>
					<button
						className="left-4 top-4.75 md:bottom-25 xl:bottom-24 xl:group-hover:bottom-25 absolute flex justify-center items-center bg-white opacity-100 xl:group-hover:opacity-100 xl:opacity-0 rounded-full size-10 transition-all duration-350 delay-100 group-hover:cursor-pointer"
						onClick={() => handleFormState?.()}
					>
						<img
							className="size-4"
							src="assets/icons/pencil.svg"
							alt="play-icon"
						/>
					</button>
				</>
			)}
		</article>
	);
}

export function AlbumCardSkeleton() {
	return (
		<article className="flex flex-col w-full max-w-albumCardWidth h-full min-h-albumCardHeight">
			<div className="bg-gray-900 rounded-t-xl overflow-hidden animate-pulse grow"></div>
			<div className="bg-black/30 rounded-b-xl overflow-hidden">
				<div className="flex flex-col gap-3 bg-black/30 backdrop-blur-xl p-4 h-full">
					<h6 className="bg-gray-900 px-4 py-2 rounded w-1/2 animate-pulse"></h6>
					<h5 className="bg-gray-900 px-4 py-2 rounded animate-pulse"></h5>
					<p className="bg-gray-900 px-4 py-2 rounded w-2/3 animate-pulse"></p>
				</div>
			</div>
		</article>
	);
}

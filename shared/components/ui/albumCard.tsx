export function AlbumCard({ title, description, titleColor, img }: AlbumCard) {
	return (
		<article className="max-w-albumCardWidth h-albumCardHeight flex flex-col">
			<div className="rounded-t-xl overflow-hidden">
				<img
					src={img}
					alt="album-background"
					className="w-full"
				/>
			</div>
			<div className={`bg-[url(${img})] bg-cover rounded-b-xl overflow-hidden grow`}>
				<div className="backdrop-blur-xl bg-black/30 p-4 h-full">
					{titleColor == "red" ? <h6 className="uppercase text-pinkRed">New For You</h6> : <h6 className="uppercase text-greenBlue">New For You</h6>}
					<h5>{title}</h5>
					<p className="albumCardDesc text-sm font-semibold">{description}</p>
				</div>
			</div>
		</article>
	);
}

export function AlbumCardSkeleton() {
	return (
		<article className="max-w-albumCardWidth w-full min-h-albumCardHeight h-full flex flex-col">
			<div className="rounded-t-xl overflow-hidden grow animate-pulse bg-gray-900"></div>
			<div className="bg-black/30 rounded-b-xl overflow-hidden">
				<div className="backdrop-blur-xl bg-black/30 p-4 h-full flex flex-col gap-3">
					<h6 className="py-2 px-4 bg-gray-900 animate-pulse rounded w-1/2"></h6>
					<h5 className="py-2 px-4 bg-gray-900 animate-pulse rounded"></h5>
					<p className="py-2 px-4 bg-gray-900 animate-pulse rounded w-2/3"></p>
				</div>
			</div>
		</article>
	);
}

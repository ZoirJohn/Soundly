export function AlbumCard({ title, description, titleColor, img }: AlbumCard) {
	return (
		<article className="flex flex-col max-w-albumCardWidth h-albumCardHeight">
			<div className="rounded-t-xl overflow-hidden">
				<img
					src={img}
					alt="album-background"
					className="block w-full max-w-albumCardWidth"
				/>
			</div>
			<div
				className={`rounded-b-xl bg-black/10 backdrop-blur-2xl overflow-hidden grow`}
				style={{ backgroundImage: `url(${img})` }}
			>
				<div className="bg-black/30 backdrop-blur-xl p-4 h-full">
					{titleColor == "red" ? <h6 className="text-pinkRed uppercase">New For You</h6> : <h6 className="text-greenBlue uppercase">New For You</h6>}
					<h5>{title}</h5>
					<p className="font-semibold text-sm albumCardDesc">{description}</p>
				</div>
			</div>
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

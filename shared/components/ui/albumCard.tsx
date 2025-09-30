export function AlbumCard({ title, description }: AlbumCard) {
	return (
		<article className="max-w-albumCardWidth h-albumCardHeight flex flex-col">
			<div className="rounded-t-xl overflow-hidden">
				<img
					src="assets/images/background1.png"
					alt="album-background"
					className="w-full"
				/>
			</div>
			<div className="bg-[url('/assets/images/background1.png')] rounded-b-xl overflow-hidden grow">
				<div className="backdrop-blur-xl bg-black/30 p-4 h-full">
					<h6>New For You</h6>
					<h5>{title}</h5>
					<p className="albumCardDesc text-sm font-semibold">{description}</p>
				</div>
			</div>
		</article>
	);
}

export function AlbumCardSkeleton() {
	return <article className="max-w-albumCardWidth w-full min-h-albumCardHeight h-full flex flex-col">
		<div className="rounded-t-xl overflow-hidden grow"></div>
		<div className="bg-black/30 rounded-b-xl overflow-hidden">
			<div className="backdrop-blur-xl bg-black/30 p-4 h-full">
				<h6>New For You</h6>
				<h5 className="animate-pulse">asdf</h5>
				<p className="animate-pulse">alsjdf</p>
			</div>
		</div>
	</article>;
}

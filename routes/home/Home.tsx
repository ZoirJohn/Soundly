import Playlist from "shared/components/Playlist";
import PageButton from "shared/components/ui/pageButton";

export default function Home() {
	return (
		<section className="mx-auto max-w-7xl">
			<div className="flex flex-wrap justify-between items-center gap-6 mb-4">
				<h4 className="rowTitle">Albums</h4>
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

			<Playlist />
		</section>
	);
}

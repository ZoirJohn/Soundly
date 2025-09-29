import AlbumCard from "shared/components/ui/albumCard";

export default function Home() {
	return (
		<section className="max-w-7xl mx-auto mt-7">
			<h4 className="rowTitle">Albums</h4>
			<article>
				<AlbumCard />
			</article>
		</section>
	);
}

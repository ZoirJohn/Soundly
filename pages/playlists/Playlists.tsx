import Playlist from "shared/components/Playlist";
import { useMeQuery } from "shared/hooks/useMeQuery";

export default function Playlists() {
	const { data } = useMeQuery();
	return (
		<div className="max-w-7xl dark mx-auto">
			<h4 className="rowTitle mb-4"> My Albums</h4>
			{data?.data?.userId ? <Playlist userId={data?.data?.userId} /> : <h2>Loading...</h2>}
		</div>
	);
}

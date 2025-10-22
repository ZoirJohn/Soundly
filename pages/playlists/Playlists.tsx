import { Navigate } from "react-router";
import Playlist from "shared/components/Playlist";
import { useMeQuery } from "shared/hooks/useMeQuery";

export default function Playlists() {
	const { data } = useMeQuery();
	if (!data?.data?.userId) {
		return <Navigate to="/" />;
	}
	return (
		<div className="max-w-7xl dark mx-auto">
			<h4 className="rowTitle mb-4"> My Albums</h4>
			<Playlist userId={data?.data?.userId} />
		</div>
	);
}

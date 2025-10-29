export const playlists = {
	all: ["playlists"],
	ownPlaylists: (userId: string) => [...playlists.all, userId],
	currentPlaylist: (playlistId: string) => [...playlists.all, playlistId],
};

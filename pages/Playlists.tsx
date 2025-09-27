import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "shared/components/ui/table";
import { client } from "~/lib/api/client";

export default function Playlists() {
	const { data, isLoading, isFetched } = useQuery({
		queryKey: ["playlists"],
		queryFn: () => client.GET("/playlists"),
	});
	const isDataLoaded = !isLoading && isFetched && data?.data?.data.length;
	const isDataEmpty = !isLoading && isFetched && (data?.data?.data.length || 0) == 0;

	return (
		<div className="max-w-7xl dark mx-auto">
			<Table>
				{isDataLoaded && <TableCaption>A list of playlists.</TableCaption>}
				{isDataEmpty && <TableCaption>There are no playlists.</TableCaption>}
				<TableHeader>
					<TableRow>
						<TableHead className="w-2 text-muted-foreground">#</TableHead>
						<TableHead className="text-muted-foreground">Title</TableHead>
						<TableHead className="text-muted-foreground">Date added</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.data?.data.map(({ attributes, id }, idx) => (
						<TableRow
							key={id}
							className="cursor-pointer"
						>
							<TableCell className="font-medium text-base text-muted-foreground">{idx + 1}</TableCell>
							<TableCell className="font-medium">{attributes.title}</TableCell>
							<TableCell>{new Date(attributes.addedAt).toLocaleString(["en"], { day: "2-digit", month: "short", year: "numeric" })}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

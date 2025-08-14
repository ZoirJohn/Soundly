import { useQuery } from '@tanstack/react-query';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { client } from '~/lib/api/client';

export default function Playlists() {
    const { data } = useQuery({
        queryKey: ['playlists'],
        queryFn: () => client.GET('/playlists'),
    });
    console.log("What's up");
    
    return (
        <div className="container dark mx-auto">
            <Table>
                <TableCaption>A list of playlists</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Creator</TableHead>
                        <TableHead className="">Id</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.data?.data.map(({ attributes, id }) => (
                        <TableRow key={id}>
                            <TableCell className="font-medium">{attributes.title}</TableCell>
                            <TableCell>{attributes.user.name}</TableCell>
                            <TableCell>{attributes.addedAt}</TableCell>
                            <TableCell>{id}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

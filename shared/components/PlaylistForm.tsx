import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "entities/api/client";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Navigate, redirect } from "react-router";

type TProps = {
	title: string;
	description: string;
};

export default function PlaylistForm({ header, playlistId, manageFormState }: { header?: string; playlistId: string; manageFormState: () => void }) {
	const { data, isLoading } = useQuery({
		queryKey: ["playlist"],
		queryFn: async () => {
			const response = await client.GET("/playlists/{playlistId}", {
				params: {
					path: { playlistId },
				},
			});
			if (response.error) {
				throw response.error;
			}
			return response.data;
		},
		enabled: !!playlistId,
	});
	const queryClient = useQueryClient();
	const createPlaylistMutation = useMutation({
		mutationFn: async ({ title, description }: TProps) => {
			const response = await client.POST("/playlists", {
				body: {
					title,
					description,
				},
			});
			if (response.error) {
				throw response.error;
			}
			return response;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["playlists"],
				refetchType: "none",
			});
			manageFormState();
			return <Navigate to="/" />;
		},
		onError: (error) => {
			console.error(error);
		},
	});
	const key = ["playlists", data?.data.attributes.user];
	const editPlaylistMutation = useMutation({
		mutationFn: async ({ title, description }: TProps) => {
			const response = await client.PUT("/playlists/{playlistId}", {
				body: {
					title,
					description,
					tagIds: [],
				},
				params: { path: { playlistId } },
			});
			if (response.error) {
				throw response;
			}
			return response;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["playlists"],
				refetchType: "none",
			});
		},
		onMutate: async (formData: { title: string; description: string }) => {
			await queryClient.cancelQueries({ queryKey: key });
			const previousAlbums = queryClient.getQueryData(key);
			console.log(previousAlbums);
			return { previousAlbums };
		},
		onError: (error, __, context) => {
			queryClient.setQueryData(["playlists", data?.data.attributes.user.id], context?.previousAlbums);
			console.error(error);
		},
		// onSettled: () => {
		// 	queryClient.invalidateQueries({ queryKey: ["playlists"] });
		// 	manageFormState();
		// 	return <Navigate to="/" />;
		// },
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setError,
	} = useForm<TProps>();

	const onSubmit: SubmitHandler<TProps> = (formData) => {
		const mutation = data?.data.id ? editPlaylistMutation : createPlaylistMutation;
		mutation.mutate(formData);
	};
	return isLoading ? (
		<>Loading...</>
	) : (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col max-w-1/4 [&>input]:px-4 [&>*]:py-2 [&>input]:bg-gray-800 [&>*]:rounded-md"
		>
			<h4 className="rowTitle">{header}</h4>
			<input
				{...register("title", { required: true })}
				placeholder="Title"
				defaultValue={data?.data.attributes?.title}
			/>
			{errors.title ? <span className="p-0 text-red-500">Title is required</span> : <span className="mb-6"></span>}

			<input
				{...register("description", { required: true })}
				placeholder="Description"
				defaultValue={data?.data.attributes?.description!}
			/>
			{errors.description ? <span className="p-0 text-red-500">Description is required</span> : <span className="mb-6"></span>}
			<button
				type="submit"
				className="cursor-pointer bg-white text-black self-start px-6"
			>
				{data?.data.id ? "Edit" : "Create"}
			</button>
			{errors.root && <h1>{errors.root.message}</h1>}
		</form>
	);
}

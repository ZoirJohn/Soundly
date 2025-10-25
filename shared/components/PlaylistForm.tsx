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
		},
	});
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
			const response = await queryClient.cancelQueries({ queryKey: ["playlist"] });
			const previousAlbums = queryClient.getQueriesData({ queryKey: ["playlist"] });
			console.log(previousAlbums);

			return { previousAlbums: {}, formData };
		},
		onError: (error, newAlbum, onMutateResult) => {
			// console.log(newAlbum, onMutateResult);
			queryClient.setQueryData(["playlists", playlistId], onMutateResult?.previousAlbums);
		},
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setError,
	} = useForm<TProps>();
	const onSubmitCreate: SubmitHandler<TProps> = (data) => {
		const mutation = createPlaylistMutation;
		mutation.mutate(data);
		if (mutation.isError) {
			setError("root", { type: "custom", message: mutation.error.name });
			return <Navigate to="/" />;
		}
		if (mutation.isSuccess) {
		}
	};
	const onSubmitEdit: SubmitHandler<TProps> = (data) => {
		const mutation = editPlaylistMutation;
		mutation.mutate(data);
		if (mutation.isError) {
			setError("root", { type: "custom", message: mutation.error.name });
			return <Navigate to="/" />;
		}
		if (mutation.isSuccess) {
		}
	};
	return isLoading ? (
		<>Loading...</>
	) : (
		<form
			onSubmit={handleSubmit(data?.data.id ? onSubmitEdit : onSubmitCreate)}
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

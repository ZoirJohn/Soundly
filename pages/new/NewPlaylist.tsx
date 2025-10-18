import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "entities/api/client";
import { useForm, type SubmitHandler } from "react-hook-form";

type TProps = {
	title: string;
	description: string;
};

export default function NewPlaylist() {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: async ({ title, description }: TProps) => {
			await client.POST("/playlists", {
				body: {
					title,
					description,
				},
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries();
		},
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<TProps>();
	const onSubmit: SubmitHandler<TProps> = (data) => {
		mutation.mutate(data), reset();
	};
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col max-w-1/4 [&>input]:px-4 [&>*]:py-2 [&>input]:bg-gray-800 [&>*]:rounded-md"
		>
			<h4 className="rowTitle">Create a playlist</h4>
			<input {...register("title", { required: true })} />
			{errors.title ? <span className="p-0 text-red-500">Title is required</span> : <span className="mb-6"></span>}

			<input {...register("description", { required: true })} />
			{errors.description ? <span className="p-0 text-red-500">Description is required</span> : <span className="mb-6"></span>}
			<button
				type="submit"
				className="cursor-pointer bg-white text-black self-start px-6"
			>
				Create
			</button>
		</form>
	);
}

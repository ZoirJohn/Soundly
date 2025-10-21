import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "entities/api/client";
import { useForm, type SubmitHandler } from "react-hook-form";
import { redirect } from "react-router";

type TProps = {
	title: string;
	description: string;
};

export default function NewPlaylist() {
	const queryClient = useQueryClient();
	const mutation = useMutation({
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
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setError,
	} = useForm<TProps>();
	const onSubmit: SubmitHandler<TProps> = (data) => {
		mutation.mutate(data);
		console.log(mutation);
		
		if (mutation.isError) {
			setError("root", { type: "custom", message: mutation.error.name });
			redirect('playlists')
			return;
		}
		if(mutation.isSuccess){
		}
	};
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col max-w-1/4 [&>input]:px-4 [&>*]:py-2 [&>input]:bg-gray-800 [&>*]:rounded-md"
		>
			<h4 className="rowTitle">Create a playlist</h4>
			<input
				{...register("title", { required: true })}
				placeholder="Title"
			/>
			{errors.title ? <span className="p-0 text-red-500">Title is required</span> : <span className="mb-6"></span>}

			<input
				{...register("description", { required: true })}
				placeholder="Description"
			/>
			{errors.description ? <span className="p-0 text-red-500">Description is required</span> : <span className="mb-6"></span>}
			<button
				type="submit"
				className="cursor-pointer bg-white text-black self-start px-6"
			>
				Create
			</button>
			{errors.root && <h1>{errors.root.message}</h1>}
		</form>
	);
}

export default function Button(props: any) {
	return (
		<button
			{...props}
			className="cursor-pointer bg-hover px-3 py-1.5 hover:bg-hover/75 transition rounded-md"
		>
			{props.children}
		</button>
	);
}

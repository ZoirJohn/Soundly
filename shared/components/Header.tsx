import PageButton from "./ui/pageButton";

export default function Header() {
	return (
		<header className="flex justify-between py-4 px-13">
			<div className="flex gap-2">
				<PageButton>
					<img
						src="assets/icons/arrow.svg"
						alt="button-arrow-icon"
						className="h-4 ml-3.5"
					/>
				</PageButton>
				<PageButton>
					<img
						src="assets/icons/arrow.svg"
						alt="button-arrow-icon"
						className="rotate-180 h-4 ml-4"
					/>
				</PageButton>
			</div>
			<label
				htmlFor="search"
				className="max-w-[390px] w-full"
			>
				<input
					type="text"
					className="p-2.5 pl-9 bg-darkBackground border border-borderColor rounded-xl text-sm outline-0 placeholder:text-white w-full"
					id="search"
					placeholder="Search"
				/>
			</label>
		</header>
	);
}

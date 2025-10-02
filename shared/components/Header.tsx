import PageButton from "./ui/pageButton";

export default function Header() {
	return (
		<header className="flex justify-between px-13 py-4">
			<div className="flex gap-2">
				<PageButton size="lg">
					<img
						src="assets/icons/arrow.svg"
						alt="button-arrow-icon"
						className="ml-3.5 h-4"
					/>
				</PageButton>
				<PageButton size="lg">
					<img
						src="assets/icons/arrow.svg"
						alt="button-arrow-icon"
						className="ml-4 h-4 rotate-180"
					/>
				</PageButton>
			</div>
			<label
				htmlFor="search"
				className="relative w-full md:max-w-[310px] xl:max-w-[390px]"
			>
				<input
					type="text"
					className="bg-darkBackground p-2.5 pl-9 border border-borderColor rounded-xl outline-0 w-full placeholder:text-white text-sm"
					id="search"
					placeholder="Search"
				/>
				<img
					src="assets/icons/search.svg"
					alt="search-icon"
					className="top-1/3 absolute size-4 translate-x-2/3"
				/>
			</label>
		</header>
	);
}

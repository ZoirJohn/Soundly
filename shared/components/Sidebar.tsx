import { NavLink } from "react-router";
import { NAV_LINKS } from "shared/consts";
import { useMeQuery } from "shared/hooks/useMeQuery";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

export default function Sidebar() {
	const { data, isLoading } = useMeQuery();
	return (
		<aside className="flex flex-col gap-y-8 col-start-1 col-end-2 row-start-1 row-end-3 bg-[#212124] px-3 py-4">
			<div className="p-3 flex justify-between items-center">
				{isLoading ? (
					<div className="h-9"></div>
				) : data?.data?.userId ? (
					<>
						<div className="size-6 bg-accent rounded-full text-black flex justify-center items-center">{data.data.login.split("_")[0][0]}</div>
						<LogoutButton />
					</>
				) : (
					<LoginButton />
				)}
			</div>
			<nav>
				<ul>
					{Object.entries(NAV_LINKS).map(([name, href]) => (
						<li key={href}>
							<NavLink
								className={({ isActive }) => `${isActive ? "text-active" : "text-white"} block p-3 hover:bg-hover rounded-md transition`}
								to={"/" + href}
							>
								{name.replace(/^./, (match) => match.toUpperCase())}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>
			<ul>
				<h6 className="text-xs uppercase text-grayText">MY COLLECTION</h6>
				<li className="p-3"></li>
			</ul>
		</aside>
	);
}

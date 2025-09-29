import type { ReactNode } from "react";

export default function PageButton({ children }: { children: ReactNode }) {
	return <button className="size-10 bg-darkBackground border border-borderColor flex items-center rounded-full cursor-pointer hover:bg-darkBackgroundHover transition">{children}</button>;
}

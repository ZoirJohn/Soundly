import type { ReactNode } from "react";

export default function PageButton({ children, size }: { children: ReactNode; size: "lg" | "sm" }) {
	return <button className={`${size == "lg" ? "size-10" : "size-6"} bg-darkBackground border border-borderColor flex items-center rounded-full cursor-pointer hover:bg-darkBackgroundHover transition`}>{children}</button>;
}

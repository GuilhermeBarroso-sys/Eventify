"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase";
import { deleteDocumentCookie, getDocumentCookie } from "@/utils/clientCookies";
import { useEffect, useState } from "react";

export function Header() {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
	const route = useRouter();
	useEffect(() => {
		if(getDocumentCookie("session")) {
			setIsAuthenticated(true);
		} else {
			setIsAuthenticated(false);
		}
	}, []);
	async function logout() {
		await api.post("users/logout");
		await supabase.auth.signOut();
		deleteDocumentCookie("session");
		route.push("/login");
		setIsAuthenticated(false);
		route.refresh();
	}

	return (

		<header className="w-full bg-foreground p-4 mb-8 text-background">
			<nav className="px-4 flex justify-between items-center">
				<ul className="flex gap-4 ">
					<li><Link href={"/"}>Home</Link></li>
					<li><Link href={"/myevents"}>Events</Link></li>
					<li><Link href={"/myorders"}>orders</Link></li>
				</ul>
				{isAuthenticated ? (
					<ul>
						<li><Button variant={"ghost"}  onClick={logout}>Logout</Button></li>
					</ul>

				) : (
					<ul className="flex gap-4 ">
						<li><Link href={"/register"}>Register</Link></li>
						<li><Link href={"/login"}>Login</Link></li>
					</ul>
				)}
			</nav>
		</header>

	);
}
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Eventify",
	description: "A beautiful event project",
};

export default function RootLayout({
	children,
}: {
  children: React.ReactNode
}) {  
	return (
		<html lang="en">
			<body className={`${inter.className} bg-slate-100`}>
				<main>{children}</main>
				<Toaster />
			</body>
		</html>
	);
}

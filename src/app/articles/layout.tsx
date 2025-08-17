"use client";

import { Header } from "@/src/components/section/shared/header";
import { Footer } from "@/src/components/section/shared/footer";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className='min-h-screen flex flex-col items-center justify-between'>
			<Header />
			{children}
			<Footer />
		</main>
	);
}

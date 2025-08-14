import { AdminNav } from "@/src/components/section/admin/nav";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className='flex w-full'>
			<AdminNav />
			{children}
		</main>
	);
}

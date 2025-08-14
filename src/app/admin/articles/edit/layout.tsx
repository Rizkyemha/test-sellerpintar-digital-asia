import { AdminTopNav } from "@/src/components/section/admin/topNav";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}

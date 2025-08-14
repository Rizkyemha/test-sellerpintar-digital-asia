import { AdminTopNav } from "@/src/components/section/admin/topNav";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className='grid grid-cols-1 auto-rows-min min-h-svh w-full bg-gray-100'>
			<AdminTopNav title='Articles' />
			<div className='px-[24px] pt-[24px]'>
				<div className='overflow-hidden rounded-md border border-slate/200'>
					{children}
				</div>
			</div>
		</div>
	);
}

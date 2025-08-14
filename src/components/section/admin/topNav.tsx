import {
	Avatar,
	AvatarImage,
	AvatarFallback,
} from "@/src/components/ui/avatar";
import Link from "next/link";

export function AdminTopNav({ title }: { title: string }) {
	return (
		<div className='h-fit flex justify-between bg-gray-50 px-[24px] pt-[20px] pb-[16px] border-b'>
			<h1 className='text-xl font-semibold'>{title}</h1>
			<div className='flex gap-2 items-center'>
				<Avatar>
					<AvatarImage src='https://github.com/shadcn.png' />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<Link href='/admin/profile'>James Dean</Link>
			</div>
		</div>
	);
}

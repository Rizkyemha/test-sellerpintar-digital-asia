import { Logo } from "@/src/components/logo";
import Link from "next/link";

import { Newspaper, Tag, LogOut } from "lucide-react";

export function AdminNav() {
	return (
		<div className='box-content w-[267px] bg-blue-600 flex flex-col gap-[24px] px-[24px] pt-[24px] pb-[16px]'>
			<Logo white className='pl-[16px] w-[134px] box-content' />
			<div className='flex flex-col gap-[8px] text-white'>
				<div className='flex items-center gap-[12px] py-[8px] px-[16px] hover:bg-blue-500 hover:cursor-pointer'>
					<Newspaper size={20} />
					<Link href='/admin/articles'>Article</Link>
				</div>
				<div className='flex items-center gap-[12px] py-[8px] px-[16px] hover:bg-blue-500 hover:cursor-pointer'>
					<Tag size={20} />
					<Link href='/admin/category'>Category</Link>
				</div>
				<div className='flex items-center gap-[12px] py-[8px] px-[16px] hover:bg-blue-500 hover:cursor-pointer'>
					<LogOut size={20} />
					<Link href='/login'>Logout</Link>
				</div>
			</div>
		</div>
	);
}

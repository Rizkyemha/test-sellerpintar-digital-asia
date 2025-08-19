"use client";
import { Logo } from "@/src/components/logo";
import Link from "next/link";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog";

import { Newspaper, Tag, LogOut } from "lucide-react";

import { useAuth } from "@/src/context/auth";
import { logout as logoutUser } from "@/src/services/login";

export function AdminNav() {
	const { setIsAuthenticated } = useAuth();
	const logoutHandler = (e: React.MouseEvent) => {
		e.preventDefault();
		logoutUser();
		setIsAuthenticated(false);
	};

	return (
		<div className='w-fit box-content md:w-[267px] bg-blue-600 flex flex-col gap-[24px] pt-[24px] pb-[2px] sm:px-[24px] sm:pt-[24px] sm:pb-[16px]'>
			<Logo
				white
				className='pl-[4px] w-[50px] box-content md:pl-[16px] md:w-[134px]'
			/>
			<div className='flex flex-col gap-[8px] text-white'>
				<Link
					href='/admin/articles'
					className='flex items-center gap-[12px] py-[8px] px-[16px] hover:bg-blue-500 hover:cursor-pointer'>
					<Newspaper size={20} />
					<p className='hidden md:block'>Articles</p>
				</Link>
				<Link
					href='/admin/category'
					className='flex items-center gap-[12px] py-[8px] px-[16px] hover:bg-blue-500 hover:cursor-pointer'>
					<Tag size={20} />
					<p className='hidden md:block'>Category</p>
				</Link>
				<AlertDialog>
					<AlertDialogTrigger className='flex items-center gap-[12px] py-[8px] px-[16px] hover:bg-blue-500 hover:cursor-pointer'>
						<LogOut size={20} />
						<p className='hidden md:block'>Logout</p>
					</AlertDialogTrigger>
					<AlertDialogContent className='w-[400px] gap-[16px]'>
						<AlertDialogHeader>
							<AlertDialogTitle>Logout</AlertDialogTitle>
							<AlertDialogDescription>
								Are you sure want to logout?
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel className='hover:cursor-pointer'>
								Cancel
							</AlertDialogCancel>
							<AlertDialogAction
								onClick={logoutHandler}
								className='bg-blue-600 hover:cursor-pointer'>
								Logout
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</div>
	);
}

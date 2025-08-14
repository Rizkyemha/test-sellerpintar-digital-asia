"use client";

import AddCategory from "@/src/components/section/admin/addCategoryForm";

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
import { Button } from "@/src/components/ui/button";

import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

import { Search } from "lucide-react";
import { Plus } from "lucide-react";

export default function Category() {
	return (
		<>
			<p className='w-full p-[24px] border-b bg-white border-slate/200'>
				Total Articles : 6
			</p>
			<div className='flex justify-between w-full p-[24px] bg-white border-b border-slate/200'>
				<div className='flex gap-[8px]'>
					<Label className='hidden' htmlFor='search_category' />
					<div className='relative'>
						<Input
							className='pl-8'
							id='search_category'
							name='search_category'
							type='text'
							placeholder='Search Category'
						/>
						<Search
							className='absolute left-2 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 hover:cursor-pointer'
							size={20}
						/>
					</div>
				</div>
				<div>
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button className='bg-blue-600 px-[16px] py-2 hover:cursor-pointer'>
								<Plus size={20} />
								<p>Add category</p>
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent className='w-[400px] gap-[16px]'>
							<AlertDialogHeader>
								<AlertDialogTitle className='pb-[20px]'>
									Add category
								</AlertDialogTitle>
								<AlertDialogDescription>
									{/* Disini input form */}
									<AddCategory />
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel className='hover:cursor-pointer'>
									Cancel
								</AlertDialogCancel>
								<AlertDialogAction className='bg-red-600 hover:cursor-pointer'>
									Continue
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</div>
		</>
	);
}

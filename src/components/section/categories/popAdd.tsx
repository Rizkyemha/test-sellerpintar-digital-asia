import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog";

import { FormCategory } from "./formAddCategory";

import { Plus } from "lucide-react";

import React from "react";

export function AddCategory({
	setData,
}: {
	setData: React.Dispatch<React.SetStateAction<any[]>>;
}) {
	return (
		<div>
			<AlertDialog>
				<AlertDialogTrigger className='button text-white text-[14px] rounded-lg flex items-center gap-[8px] bg-blue-600 px-[12px] py-2 hover:cursor-pointer h-9 has-[>svg]:px-3 font-semibold'>
					<Plus size={16} />
					<p>add category</p>
				</AlertDialogTrigger>
				<AlertDialogContent className='w-[400px] gap-[16px]'>
					<AlertDialogTitle>Add Category</AlertDialogTitle>
					<AlertDialogDescription className='hidden'></AlertDialogDescription>
					<FormCategory setData={setData}>
						<AlertDialogCancel className='hover:cursor-pointer'>
							Cancel
						</AlertDialogCancel>
					</FormCategory>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}

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

import { Button } from "../../ui/button";
import { FormEditCategory } from "./formEditCategory";

export function EditCategory({
	data,
	setData,
}: {
	data: { id: string; name: string };
	setData: React.Dispatch<React.SetStateAction<any[]>>;
}) {
	return (
		<div>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button
						variant='link'
						className='px-0 text-blue-500 underline hover:cursor-pointer'>
						Edit
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent className='w-[400px] gap-[16px]'>
					<AlertDialogTitle>Edit Category</AlertDialogTitle>
					<AlertDialogDescription className='hidden'></AlertDialogDescription>
					<FormEditCategory data={data} setData={setData}>
						<AlertDialogCancel className='hover:cursor-pointer'>
							Cancel
						</AlertDialogCancel>
						<AlertDialogCancel
							type='submit'
							className='bg-blue-600 hover:cursor-pointer text-white'>
							Submit
						</AlertDialogCancel>
					</FormEditCategory>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}

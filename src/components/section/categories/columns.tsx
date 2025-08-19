"use client";

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

import { ColumnDef } from "@tanstack/react-table";

import { Category } from "@/src/lib/schemas";

import { formatDate } from "@/src/lib/utils";

import { EditCategory } from "./popEdit";

export const columns = (
	handleDelete: (id: string) => void,
	setData: React.Dispatch<React.SetStateAction<Category[]>>
): ColumnDef<Category>[] => [
	{
		accessorKey: "name",
		header: "Category",
		cell: ({ row }) => {
			return (
				<p className='w-inherit wrap-normal line-clamp-2'>
					{row.original.name}
				</p>
			);
		},
	},
	{
		accessorKey: "createdAt",
		header: "Created At",
		cell: ({ row }) => {
			const date = formatDate(row.original.createdAt);
			return (
				<p className='w-inherit wrap-normal line-clamp-2 text-center'>
					{date}
				</p>
			);
		},
	},
	{
		accessorKey: "action",
		header: "Action",
		cell: ({ row }) => {
			return (
				<div className='flex flex-wrap gap-2 justify-center gap-y-0'>
					<EditCategory data={row.original} setData={setData} />
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button
								variant='link'
								className='px-0 text-red-600 underline hover:cursor-pointer'>
								Delete
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent className='w-[400px] gap-[16px]'>
							<AlertDialogHeader>
								<AlertDialogTitle>Delete Articles</AlertDialogTitle>
								<AlertDialogDescription>
									Deleting this article is permanent and cannot be
									undone. All related content will be removed.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel className='hover:cursor-pointer'>
									Cancel
								</AlertDialogCancel>
								<AlertDialogAction
									onClick={() => handleDelete(row.original.id)}
									className='bg-red-600 hover:cursor-pointer'>
									Continue
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			);
		},
	},
];

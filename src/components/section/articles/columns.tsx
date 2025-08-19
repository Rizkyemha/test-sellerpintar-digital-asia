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

import { Article } from "@/src/lib/schemas";

import { formatDate } from "@/src/lib/utils";
import Link from "next/link";

export const columns = (
	handleDelete: (id: string) => void
): ColumnDef<Article>[] => [
	{
		accessorKey: "thumbnailUrl",
		header: "Thubmnail",
		cell: ({ row }) => {
			const imageUrl = row.original.imageUrl;
			return (
				<div className='flex items-center overflow-hidden w-[60px] h-[60px]'>
					{imageUrl ? (
						<img
							width={60}
							height={60}
							className='w-full h-full object-cover'
							src={imageUrl}
							alt={row.original.title}
						/>
					) : (
						<span className='text-xs text-gray-500'>No Image</span>
					)}
				</div>
			);
		},
	},
	{
		accessorKey: "title",
		header: "Title",
		cell: ({ row }) => {
			return (
				<p className='w-inherit wrap-normal line-clamp-2'>
					{row.original.title}
				</p>
			);
		},
	},
	{
		accessorKey: "category.name",
		header: "Category",
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
					<Button
						variant='link'
						className='px-0 underline hover:cursor-pointer'>
						<Link
							className='text-blue-500'
							href={`/articles/${row.original.id}`}>
							Preview
						</Link>
					</Button>
					<Button
						variant='link'
						className='px-0 underline hover:cursor-pointer'>
						<Link
							className='text-blue-500'
							href={`/admin/articles/edit/${row.original.id}`}>
							Edit
						</Link>
					</Button>
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

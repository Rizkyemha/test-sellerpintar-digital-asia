import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/src/components/ui/table";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/src/components/ui/select";

import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";

import { Search } from "lucide-react";
import { Plus } from "lucide-react";

import Link from "next/link";
import React from "react";

import { DataTablePropsArticle } from "@/src/lib/schemas";

export function DataTable<TData, TValue>({
	columns,
	data,
	categories,
	isLoading,
	pageCount,
	pagination,
	setPagination,
	searchQuery,
	setSearchQuery,
	selectedCategory,
	setSelectedCategory,
	totalArticles,
}: DataTablePropsArticle<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		manualPagination: true,
		pageCount: pageCount,
		state: {
			pagination,
		},
		onPaginationChange: setPagination,
	});

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	return (
		<>
			<p className='w-full p-[24px] border-b bg-white border-slate/200'>
				Total Articles : {totalArticles}
			</p>
			<div className='flex justify-between w-full p-[24px] bg-white border-b border-slate/200'>
				<div className='flex gap-[8px]'>
					<div className='grid grid-rows-1'>
						<Label className='hidden' htmlFor='category'>
							""
						</Label>
						<Select
							name='category'
							value={selectedCategory}
							onValueChange={(value) =>
								setSelectedCategory(value === "all" ? "" : value)
							}>
							<SelectTrigger className='w-[109px] bg-slate-50 border-slate/200'>
								<SelectValue placeholder='Category' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>All Categories</SelectItem>
								{categories.map((item, index) => (
									<SelectItem value={item.id} key={index}>
										{item.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<Label className='hidden' htmlFor='search' />
					<div className='relative'>
						<Input
							className='pl-8'
							id='search'
							name='search'
							type='text'
							placeholder='Search by title....'
							value={searchQuery}
							onChange={handleSearchChange}
						/>
						<Search
							className='absolute left-2 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 hover:cursor-pointer'
							size={20}
						/>
					</div>
				</div>
				<div>
					<Link href='/admin/articles/add'>
						<Button className='bg-blue-600 px-[16px] py-2'>
							<Plus size={20} />
							<p>add article</p>
						</Button>
					</Link>
				</div>
			</div>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id} className='grid grid-cols-5'>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead
										key={header.id}
										className='w-full h-auto text-center py-[12px] px-[16px] bg-gray-100'>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
											  )}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{isLoading ? (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className='h-[843px]'></TableCell>
						</TableRow>
					) : table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								className='grid grid-cols-5'
								key={row.id}
								data-state={row.getIsSelected() && "selected"}>
								{row.getVisibleCells().map((cell) => (
									<TableCell
										key={cell.id}
										className='w-full py-[12px] px-[16px] justify-center bg-gray-50 border-b-[1px]'>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext()
										)}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className='h-24 text-center'>
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<div className='flex items-center justify-center space-x-2 py-4 bg-gray-50'>
				<Button
					className='bg-gray-50 border-0 shadow-none hover:bg-gray-50 hover:cursor-pointer hover:underline'
					variant='outline'
					size='sm'
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}>
					{"< "}Previous
				</Button>

				{pageCount >= 3 && pagination.pageIndex + 1 == pageCount && (
					<Button
						className='text-slate-900 bg-gray-50 border-0 shadow-none hover:bg-gray-50 hover:cursor-pointer hover:underline'
						onClick={() => table.setPageIndex(0)}>
						...
					</Button>
				)}

				{pageCount >= 2 && pagination.pageIndex + 1 > 1 && (
					<Button
						className='text-slate-900 bg-gray-50 border-0 shadow-none hover:bg-gray-50 hover:cursor-pointer hover:underline'
						onClick={() => table.previousPage()}>
						{pagination.pageIndex}
					</Button>
				)}

				<Button className='bg-white text-slate-900 border-slate-200 hover:bg-white hover:cursor-pointer'>
					{pagination.pageIndex + 1}
				</Button>

				{pageCount >= 2 && pagination.pageIndex + 1 < 2 && (
					<Button
						className='text-slate-900 bg-gray-50 border-0 shadow-none hover:bg-gray-50 hover:cursor-pointer hover:underline'
						onClick={() => table.nextPage()}>
						{pagination.pageIndex + 2}
					</Button>
				)}

				{pageCount >= 3 && pagination.pageIndex + 1 <= pageCount - 1 && (
					<Button
						className='text-slate-900 bg-gray-50 border-0 shadow-none hover:bg-gray-50 hover:cursor-pointer hover:underline'
						onClick={() => table.setPageIndex(pageCount)}>
						...
					</Button>
				)}

				<Button
					className='bg-gray-50 border-0 shadow-none hover:bg-gray-50 hover:cursor-pointer hover:underline'
					variant='outline'
					size='sm'
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}>
					Next {" >"}
				</Button>
			</div>
		</>
	);
}

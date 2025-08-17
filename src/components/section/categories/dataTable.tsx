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

import { AddCategory as AddCategoryButton } from "./popAdd";

import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";

import { Search } from "lucide-react";

import React from "react";

import { DataTablePropsCategory } from "@/src/lib/schemas";

export function DataTable<TData, TValue>({
	columns,
	data,
	setData,
	isLoading,
	pageCount,
	pagination,
	setPagination,
	searchQuery,
	setSearchQuery,
	totalCategories,
}: DataTablePropsCategory<TData, TValue>) {
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

	console.log("DataTable categories", data);

	return (
		<>
			<p className='w-full p-[24px] border-b bg-white border-slate/200'>
				Total Categories : {totalCategories}
			</p>
			<div className='flex justify-between w-full p-[24px] bg-white border-b border-slate/200'>
				<div className='flex gap-[8px]'>
					<Label className='hidden' htmlFor='search' />
					<div className='relative'>
						<Input
							className='pl-8'
							id='search'
							name='search'
							type='text'
							placeholder='Search Category'
							value={searchQuery}
							onChange={handleSearchChange}
						/>
						<Search
							className='absolute left-2 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 hover:cursor-pointer'
							size={20}
						/>
					</div>
				</div>
				<AddCategoryButton setData={setData} />
			</div>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id} className='grid grid-cols-3'>
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
								className='grid grid-cols-3'
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

				{pagination.pageIndex + 1 == pageCount && (
					<Button
						className='text-slate-900 bg-gray-50 border-0 shadow-none hover:bg-gray-50 hover:cursor-pointer hover:underline'
						onClick={() => table.setPageIndex(0)}>
						...
					</Button>
				)}
				{pagination.pageIndex !== 0 && (
					<Button
						className='text-slate-900 bg-gray-50 border-0 shadow-none hover:bg-gray-50 hover:cursor-pointer hover:underline'
						onClick={() => table.setPageIndex(pagination.pageIndex - 1)}>
						{pagination.pageIndex}
					</Button>
				)}
				<Button className='bg-white text-slate-900 border-slate-200 hover:bg-white hover:cursor-pointer'>
					{pagination.pageIndex + 1}
				</Button>

				{pagination.pageIndex + 1 && pagination.pageIndex + 1 < 2 && (
					<Button
						className='text-slate-900 bg-gray-50 border-0 shadow-none hover:bg-gray-50 hover:cursor-pointer hover:underline'
						onClick={() => table.setPageIndex(1)}>
						{pagination.pageIndex + 2}
					</Button>
				)}
				{pagination.pageIndex + 1 == pagination.pageIndex + 2 && (
					<Button>{pagination.pageIndex + 2}</Button>
				)}
				{(pagination.pageIndex == 0 ||
					pagination.pageIndex + 1 < pageCount) && (
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

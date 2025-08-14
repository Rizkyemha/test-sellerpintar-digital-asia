"use client";

import {
	ColumnDef,
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

import { cn } from "@/src/lib/utils";
import Link from "next/link";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<>
			<p className='w-full p-[24px] border-b bg-white border-slate/200'>
				Total Articles : {table.getRowModel().rows.length}
			</p>
			<div className='flex justify-between w-full p-[24px] bg-white border-b border-slate/200'>
				<div className='flex gap-[8px]'>
					<div className='grid grid-rows-1'>
						<Label className='hidden' htmlFor='category'>
							""
						</Label>
						<Select name='category'>
							<SelectTrigger className='w-[109px] bg-slate-50 border-slate/200'>
								<SelectValue placeholder='Category' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='admin'>Admin</SelectItem>
								<SelectItem value='user'>User</SelectItem>
								<SelectItem value='cihu'>cihui</SelectItem>
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
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								className='grid grid-cols-5'
								key={row.id}
								data-state={row.getIsSelected() && "selected"}>
								{row.getVisibleCells().map((cell) => (
									<TableCell
										key={cell.id}
										className='w-full py-[12px] px-[16px] justify-center bg-gray-50'>
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
		</>
	);
}

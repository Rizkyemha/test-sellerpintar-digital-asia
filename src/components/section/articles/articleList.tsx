"use client";

import { useState, useEffect } from "react";
import { getArticles } from "@/src/services/articles";
import { getCategories } from "@/src/services/cetegories";
import { CardArticle } from "@/src/components/section/articles/cardArticle";
import { useDebounce } from "@/src/hooks/useDebounce";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/src/components/ui/select";
import { Input } from "@/src/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";

type Article = {
	id: string;
	title: string;
	content: string;
	category: { name: string };
	imageUrl: string;
	user: { username: string };
	createdAt: string;
};

type Category = {
	id: string;
	name: string;
};

export function ArticlesContainer() {
	const [articles, setArticles] = useState<Article[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);

	const [searchQuery, setSearchQuery] = useState("");
	const debouncedSearchQuery = useDebounce(searchQuery, 500);
	const [pagination, setPagination] = useState({
		page: 1,
		limit: 9,
	});
	const [totalArticles, setTotalArticles] = useState(0);
	const [selectedCategory, setSelectedCategory] = useState("");

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const response = await getArticles({
					title: debouncedSearchQuery,
					page: pagination.page,
					limit: pagination.limit,
					category: selectedCategory,
				});
				setArticles(response.data);
				setTotalArticles(response.total);
			} catch (error) {
				console.error("Failed to fetch articles:", error);
			}
		};

		fetchArticles();
	}, [pagination, debouncedSearchQuery, selectedCategory]);

	useEffect(() => {
		const fetchCategories = async () => {
			setIsLoading(true);
			try {
				const response = await getCategories();
				setCategories(response.data.data);
			} catch (error) {
				console.error("Gagal mengambil data category:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchCategories();
	}, []);

	const pageCount = Math.ceil(totalArticles / pagination.limit);

	const handleFirstPage = () => {
		if (pagination.page > 1) {
			setPagination((prev) => ({ ...prev, page: 1 }));
		}
	};

	const handleLastPage = () => {
		setPagination((prev) => ({ ...prev, page: pageCount }));
	};

	const handleNextPage = () => {
		if (pagination.page < pageCount) {
			setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
		}
	};

	const handlePreviousPage = () => {
		if (pagination.page > 1) {
			setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
		}
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	return (
		<>
			<div className='relative bg-blue-500 w-full py-20 px-10'>
				<div className='relative z-11 flex flex-col items-center justify-center gap-10'>
					<div className='text-white flex flex-col items-center justify-center gap-3'>
						<p className='text-center'>Blog Geznet</p>
						<h2 className='text-center text-[36px] font-medium leading-[100%]'>
							The Journal : Design Resources, Interviews, and Industry
							News
						</h2>
						<p className='text-center'>
							Your daily dose of design insights!
						</p>
					</div>
					<div className='flex gap-[8px] flex-col md:flex-row'>
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
								<SelectTrigger className='w-full bg-slate-50 border-slate/200 md:w-fit'>
									<SelectValue placeholder='Select category' />
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
								className='pl-8 bg-white border-slate/200'
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
				</div>
				<div className='absolute top-0 left-0 z-10 h-full w-full bg-blue-500/80'></div>
				<div className='absolute top-0 left-0 z-9 h-full w-full'>
					<Image
						width={200}
						height={200}
						className='w-full h-full object-cover'
						src='/banner.jpg'
						alt='banner'
					/>
				</div>
			</div>
			<div className='w-full grid grid-cols-1 gap-6 px-5 pt-10 pb-[60px] sm:px-[60px] lg:px-[100px] sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-[60px] lg:gap-x-[40px]'>
				{articles.map((article) => (
					<Link href={`/articles/${article.id}`} key={article.id}>
						<CardArticle key={article.id} article={article} />
					</Link>
				))}
			</div>
			<div className='flex items-center justify-center space-x-2 py-4'>
				<Button
					className='border-0 shadow-none bg-white hover:bg-gray-50 hover:cursor-pointer hover:underline'
					variant='outline'
					size='sm'
					onClick={() => handlePreviousPage()}
					disabled={pagination.page == 1}>
					{"< "}Previous
				</Button>

				{pageCount >= 3 && pagination.page == pageCount && (
					<Button
						className='text-slate-900 bg-white border-0 shadow-none hover:bg-gray-50 hover:cursor-pointer hover:underline'
						onClick={() => handleFirstPage()}>
						...
					</Button>
				)}

				{pageCount >= 2 && pagination.page > 1 && (
					<Button
						className='text-slate-900 bg-white border-0 shadow-none hover:bg-gray-50 hover:cursor-pointer hover:underline'
						onClick={() => handlePreviousPage()}>
						{pagination.page - 1}
					</Button>
				)}

				<Button className='bg-white text-slate-900 border-slate-200 border-1 hover:bg-white hover:cursor-pointer'>
					{pagination.page}
				</Button>

				{pageCount >= 2 && pagination.page + 1 == 2 && (
					<Button
						className='text-slate-900 bg-white border-0 shadow-none hover:bg-gray-50 hover:cursor-pointer hover:underline'
						onClick={() => handleNextPage()}>
						{pagination.page + 1}
					</Button>
				)}

				{pageCount >= 3 && pagination.page != pageCount && (
					<Button
						className='text-slate-900 bg-white border-0 shadow-none hover:bg-gray-50 hover:cursor-pointer hover:underline'
						onClick={() => handleLastPage()}>
						...
					</Button>
				)}

				<Button
					className='bg-white border-0 shadow-none hover:bg-gray-50 hover:cursor-pointer hover:underline'
					variant='outline'
					size='sm'
					onClick={() => handleNextPage()}
					disabled={pagination.page == pageCount}>
					Next {" >"}
				</Button>
			</div>
		</>
	);
}

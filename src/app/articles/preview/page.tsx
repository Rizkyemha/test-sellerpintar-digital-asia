"use client";

import { useState, useEffect } from "react";
import { DetailArticle } from "@/src/components/section/articles/detailArticle";

export default function ArticleById() {
	type ArticleType = {
		id: string;
		title: string;
		content: string;
		categoryId: string;
	};

	const [article, setArticle] = useState<ArticleType | null>(null);

	useEffect(() => {
		const fetchArticle = async () => {
			try {
				const articleData = sessionStorage.getItem("previewData");
				const { article }: any = articleData
					? JSON.parse(articleData)
					: null;
				setArticle(article);
			} catch (error) {
				console.error("Error with slug:", error);
			}
		};

		fetchArticle();
	}, []);

	console.log("ini article", article);

	return (
		<div className='flex flex-col items-center justify-center min-h-screen'>
			{article ? (
				<>
					<DetailArticle article={article} />
				</>
			) : (
				<div className='text-red-500'>Artikel tidak ditemukan.</div>
			)}
		</div>
	);
}

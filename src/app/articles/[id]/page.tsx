"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getArticleById } from "@/src/services/articles";
import { DetailArticle } from "@/src/components/section/articles/detailArticle";
import { Recomendations } from "@/src/components/section/articles/recomendations";

export default function ArticleById() {
	const params = useParams();
	const id = params.id as string;

	if (!id) {
		return <div className='text-red-500'>Artikel tidak ditemukan.</div>;
	}

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
				const articleData = await getArticleById(id);
				setArticle(articleData);
			} catch (error) {
				console.log("Error with slug:", error);
			}
		};

		fetchArticle();
	}, [id]);

	return (
		<div className='flex flex-col items-center justify-center min-h-screen'>
			{article ? (
				<>
					<DetailArticle article={article} />
					<Recomendations
						categoryId={article.categoryId}
						id={article.id}
					/>
				</>
			) : (
				<div className='text-red-500'>Artikel tidak ditemukan.</div>
			)}
		</div>
	);
}

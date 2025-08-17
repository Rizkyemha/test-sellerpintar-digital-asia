import { useEffect, useState } from "react";
import { getArticles } from "@/src/services/articles";
import Link from "next/link";
import { CardArticle } from "@/src/components/section/articles/cardArticle";

export function Recomendations({
	categoryId,
	id,
}: {
	categoryId: string;
	id: string;
}) {
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const response = await getArticles({
					category: categoryId,
					limit: 5,
				});

				const filteredArticles = response.data.filter(
					(article: any) => article.id !== id
				);

				setArticles(filteredArticles);
				setLoading(false);
			} catch (error) {
				setError(true);
				setLoading(false);
			}
		};

		fetchArticles();
	}, [categoryId]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return (
			<div className='text-red-500'>
				Gagal mengambil rekomendasi artikel.
			</div>
		);
	}

	return (
		<div className='pt-[40px] px-[20px] pb-[60px] md:px-[80px] lg:px-[180px]'>
			<h2 className='text-xl font-semibold mb-5'>Rekomendasi Artikel</h2>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-10'>
				{articles.slice(0, 3).map((article: any) => (
					<Link href={`/articles/${article.id}`} key={article.id}>
						<CardArticle key={article.id} article={article} />
					</Link>
				))}
			</div>
		</div>
	);
}

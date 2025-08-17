import { getArticleById } from "@/src/services/articles";
import { getCategories } from "@/src/services/cetegories";
import ArticleFormLoader from "@/src/components/section/articles/articleFormLoader";
import { BackButton } from "@/src/components/section/articles/backButton";

export default async function ArticlePage({ params }: any): Promise<any> {
	const id = await params.id;

	const article = await getArticleById(id);

	const response = await getCategories();
	const categories = response?.data?.data || [];

	if (!article) {
		return <div>Artikel tidak ditemukan!</div>;
	}

	return (
		<div className='bg-gray-50 rounded-lg'>
			<BackButton name='Edit article' />
			<ArticleFormLoader article={article} categories={categories} />
		</div>
	);
}

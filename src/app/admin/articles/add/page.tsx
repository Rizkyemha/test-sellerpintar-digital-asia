import { getCategories } from "@/src/services/cetegories";
import ArticleFormLoader from "@/src/components/section/articles/articleFormLoader";
import { BackButton } from "@/src/components/section/articles/backButton";

export default async function ArticlePage() {
	const response = await getCategories();
	const categories = response.data.data;

	return (
		<div className='bg-gray-50 rounded-lg'>
			<BackButton name='Edit article' />
			<ArticleFormLoader categories={categories} />
		</div>
	);
}

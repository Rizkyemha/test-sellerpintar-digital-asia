const { convert } = require("html-to-text");
import { formatDate } from "@/src/lib/utils";

export function CardArticle({ article }: { article: any }) {
	const plainTextContent = convert(article.content, {
		wordwrap: 130,
	});

	return (
		<div className='flex flex-col gap-2'>
			<div className='relative w-full rounded-[12px] h-[200px] md:h-[240px] flex items-center justify-center overflow-hidden bg-gray-50'>
				<img
					className='absolute w-full rounded-[12px] h-full object-cover hover:scale-110 transition-transform duration-200'
					src={article.imageUrl}
					alt={article.title}
					loading='lazy'
				/>
			</div>
			<p className='text-gray-500 text-[14px]'>
				{formatDate(article.createdAt, "MMMM dd, yyyy")}
			</p>
			<h3 className='text-lg font-semibold line-clamp-2'>{article.title}</h3>
			<p className='text-gray-600 text-sm line-clamp-2'>
				{plainTextContent}
			</p>
			<div className='flex items-center justify-between'>
				<p className='text-blue-900 bg-blue-200 rounded-full px-4 py-1 text-[12px]'>
					{article.category.name}
				</p>
			</div>
		</div>
	);
}

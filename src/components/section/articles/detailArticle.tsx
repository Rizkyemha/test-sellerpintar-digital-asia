import { formatDate } from "@/src/lib/utils";
import { Dot } from "lucide-react";
import { ArticleBody } from "./articleContent";

export function DetailArticle({ article }: { article: any }) {
	console.log("createdAt", article.title);
	return (
		<div className='w-full flex flex-col items-center justify-center gap-6 px-5 py-10 md:px-[80px] lg:px-[180px] md:gap-8 lg:gap-10'>
			<div className='flex flex-col items-center gap-4'>
				<div className='flex items-center'>
					<p className='text-[14px] text-slate-600 font-medium'>
						{formatDate(article.createdAt, "MMMM dd, yyyy")}
					</p>
					<Dot className='text-slate-600' />
					<p className='text-[14px] text-slate-600 font-medium'>
						Created by {article.user.username}
					</p>
				</div>
				<h3 className='text-2xl font-semibold text-center'>
					{article.title}
				</h3>
			</div>
			<div className='flex items-center justify-center overflow-hidden w-full h-[240px] rounded-xl md:h-[380px] lg:h-[480px]'>
				<img
					src={article.imageUrl}
					alt={article.title}
					className='object-cover w-full h-full'
				/>
			</div>
			<ArticleBody htmlContent={article.content} />
		</div>
	);
}

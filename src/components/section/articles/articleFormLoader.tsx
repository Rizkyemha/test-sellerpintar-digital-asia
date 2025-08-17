"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";

export default function ArticleFormLoader({
	article = { title: "", content: "", imageUrl: "", categoryId: "" },
	categories,
}: {
	article?: any;
	categories: { id: string; name: string }[];
}) {
	const ArticleForm = useMemo(
		() =>
			dynamic(
				() => import("@/src/components/section/articles/formAddArticle"),
				{
					ssr: false,
					loading: () => <p>Loading form...</p>,
				}
			),
		[]
	);

	return <ArticleForm article={article} categories={categories} />;
}

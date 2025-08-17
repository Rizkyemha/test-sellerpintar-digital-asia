import DOMPurify from "isomorphic-dompurify";

export function ArticleBody({ htmlContent }: { htmlContent: string }) {
	const sanitizedContent = DOMPurify.sanitize(htmlContent);

	return (
		<div
			className='self-start w-full'
			dangerouslySetInnerHTML={{ __html: sanitizedContent }}
		/>
	);
}

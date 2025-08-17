"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "@/src/components/section/articles/toolbar";
import React from "react";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";

const RichTextEditor = ({
	onContentChange,
	initialContent,
}: {
	onContentChange: React.Dispatch<React.SetStateAction<string>>;
	initialContent: string;
}) => {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({}),
			Image,
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
		],
		immediatelyRender: false,
		content: initialContent,
		editorProps: {
			attributes: {
				class: "rounded-b-md border bg-gray-50 min-h-[437px] border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
			},
		},
		onUpdate: ({ editor }) => {
			const html = editor.getHTML();
			onContentChange(html);
		},
	});

	return (
		<div className='flex flex-col justify-stretch'>
			<Toolbar editor={editor} />
			<EditorContent editor={editor} />
			<p>{editor?.getText().trim().split(/\s+/).length} words</p>
		</div>
	);
};

export default RichTextEditor;

"use client";

import type { Editor } from "@tiptap/react";
import {
	Undo2,
	Redo2,
	Bold,
	Italic,
	Image,
	AlignCenter,
	AlignLeft,
	AlignRight,
	AlignJustify,
} from "lucide-react";

import { Toggle } from "@/src/components/ui/toggle";
import { useCallback } from "react";

type Props = {
	editor: Editor | null;
};

export function Toolbar({ editor }: Props) {
	if (!editor) {
		return null;
	}

	const addImage = useCallback(() => {
		if (!editor) return;

		const input = document.createElement("input");
		input.setAttribute("type", "file");
		input.setAttribute("accept", "image/*");
		input.click();

		input.onchange = () => {
			const file = input.files?.[0];
			if (!file) return;

			const reader = new FileReader();

			reader.readAsDataURL(file);

			reader.onload = () => {
				const imageUrl = reader.result as string;
				editor.chain().focus().setImage({ src: imageUrl }).run();
			};
		};
	}, [editor]);

	return (
		<div className='border border-input rounded-t-md p-1 flex items-center gap-1 flex-wrap bg-white'>
			<Toggle
				size='sm'
				onPressedChange={() => editor.chain().focus().undo().run()}
				disabled={!editor.can().chain().focus().undo().run()}>
				<Undo2 className='h-4 w-4' />
			</Toggle>
			<Toggle
				size='sm'
				onPressedChange={() => editor.chain().focus().redo().run()}
				disabled={!editor.can().chain().focus().redo().run()}>
				<Redo2 className='h-4 w-4' />
			</Toggle>
			<Toggle
				size='sm'
				pressed={editor.isActive("bold")}
				onPressedChange={() => editor.chain().focus().toggleBold().run()}>
				<Bold className='h-4 w-4' />
			</Toggle>
			<Toggle
				size='sm'
				pressed={editor.isActive("italic")}
				onPressedChange={() => editor.chain().focus().toggleItalic().run()}>
				<Italic className='h-4 w-4' />
			</Toggle>
			<Toggle size='sm' onPressedChange={addImage}>
				<Image className='h-4 w-4' />
			</Toggle>
			<Toggle
				size='sm'
				pressed={editor.isActive({ textAlign: "left" })}
				onPressedChange={() =>
					editor.chain().focus().setTextAlign("left").run()
				}>
				<AlignLeft className='h-4 w-4' />
			</Toggle>
			<Toggle
				size='sm'
				pressed={editor.isActive({ textAlign: "center" })}
				onPressedChange={() =>
					editor.chain().focus().setTextAlign("center").run()
				}>
				<AlignCenter className='h-4 w-4' />
			</Toggle>
			<Toggle
				size='sm'
				pressed={editor.isActive({ textAlign: "right" })}
				onPressedChange={() =>
					editor.chain().focus().setTextAlign("right").run()
				}>
				<AlignRight className='h-4 w-4' />
			</Toggle>
			<Toggle
				size='sm'
				pressed={editor.isActive({ textAlign: "justify" })}
				onPressedChange={() =>
					editor.chain().focus().setTextAlign("justify").run()
				}>
				<AlignJustify className='h-4 w-4' />
			</Toggle>
		</div>
	);
}

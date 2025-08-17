"use client";

import React, { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { articleSchema, ArticleFormData } from "@/src/lib/schemas";
import { updateArticle, createArticle } from "@/src/services/articles";

import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/src/components/ui/select";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";

import { processAndUploadImages } from "@/src/lib/imageProcessor";

export function ArticleForm({
	article,
	categories,
}: {
	article: any;
	categories: { id: string; name: string }[];
}) {
	const RichTextEditor = useMemo(
		() =>
			dynamic(
				() => import("@/src/components/section/articles/richTextEditor"),
				{
					ssr: false,
				}
			),
		[]
	);

	const {
		register,
		handleSubmit,
		control,
		watch,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<ArticleFormData>({
		defaultValues: {
			title: article?.title || "",
			content: article?.content || "",
			imageUrl: article?.imageUrl ? "" : [],
			categoryId: article?.categoryId || "",
		},
		resolver: zodResolver(articleSchema),
	});

	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const imageFile = watch("imageUrl");
	const [imagePreview, setImagePreview] = useState<string | null>(
		article?.imageUrl || null
	);

	useEffect(() => {
		if (imageFile && imageFile.length > 0) {
			const file = imageFile[0];
			const newPreviewUrl = URL.createObjectURL(file);
			setImagePreview(newPreviewUrl);
			return () => URL.revokeObjectURL(newPreviewUrl);
		}
	}, [imageFile]);

	const handleCustomClick = () => {
		fileInputRef.current?.click();
	};

	const handleRemoveImage = (e: React.MouseEvent) => {
		e.stopPropagation();
		setImagePreview(null);
		setValue("imageUrl", null as any, { shouldValidate: true });
	};

	const { ref, ...rest } = register("imageUrl");

	const onSubmit = async (data: ArticleFormData) => {
		try {
			const cleanContent = await processAndUploadImages(data.content);
			const articlePayload: any = {
				title: data.title,
				content: cleanContent,
				categoryId: data.categoryId,
			};

			if (data.imageUrl && data.imageUrl.length > 0) {
				articlePayload.imageFile = data.imageUrl[0];
			}

			if (article && article.id) {
				await updateArticle(article.id, articlePayload);
				alert("Artikel berhasil diperbarui!");
			} else {
				await createArticle(articlePayload);
				alert("Artikel berhasil dibuat!");
			}
		} catch (error) {
			console.error("Gagal memperbarui artikel:", error);
			alert("Gagal memperbarui artikel.");
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='grid gap-6 px-6 grid-cols-1'>
			<div className='space-y-2'>
				<Label className='text-[14px]'>Thumbnails</Label>
				<div>
					{imagePreview ? (
						<div className='relative w-fit bg-white max-w-xs p-3 rounded-lg border-gray-200 flex flex-col items-center justify-between gap-2'>
							<div className='w-[200px] h-[120px] overflow-hidden rounded-md flex items-center justify-center'>
								<img
									src={imagePreview}
									alt='Image Preview'
									className='w-full h-auto rounded-md object-cover'
								/>
							</div>
							<div className='flex gap-2'>
								<button
									className='text-blue-500 underline hover:cursor-pointer text-[12px]'
									onClick={handleCustomClick}
									type='button'>
									Change
								</button>
								<button
									className='text-red-500 underline hover:cursor-pointer text-[12px]'
									type='button'
									onClick={handleRemoveImage}>
									Delete
								</button>
							</div>
						</div>
					) : (
						<div
							onClick={handleCustomClick}
							className='flex justify-center items-center flex-col w-[200px] h-[150px] px-6 py-10 border-2 border-dashed border-gray-200 rounded-md cursor-pointer hover:bg-gray-50'>
							<p className='mt-2 text-sm text-gray-600'>
								Click to select file
							</p>
							<p className='text-center text-xs text-gray-500'>
								Support File Type: jpg or png
							</p>
						</div>
					)}
				</div>
				<input
					type='file'
					id='imageUrl'
					accept='image/png, image/jpeg, image/jpg'
					className='hidden'
					{...rest}
					ref={(e) => {
						ref(e);
						fileInputRef.current = e;
					}}
				/>
				{errors.imageUrl && (
					<p className='text-sm text-red-500'>
						{errors.imageUrl.message as string}
					</p>
				)}
			</div>
			<div className='w-full space-y-2'>
				<Label htmlFor='title'>Title</Label>
				<Input
					className='bg-white'
					id='title'
					placeholder='Input title'
					type='text'
					{...register("title")}
				/>
				{errors.title && (
					<p className='text-sm text-red-500'>{errors.title.message}</p>
				)}
			</div>

			<div className='w-full space-y-2'>
				<Label htmlFor='categoryId'>Category</Label>
				<Controller
					name='categoryId'
					control={control}
					render={({ field }) => (
						<Select
							onValueChange={field.onChange}
							defaultValue={field.value}>
							<SelectTrigger className='w-full bg-white'>
								<SelectValue placeholder='Select a category' />
							</SelectTrigger>
							<SelectContent>
								{categories.map((cat) => (
									<SelectItem key={cat.id} value={cat.id}>
										{cat.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					)}
				/>
				{errors.categoryId && (
					<p className='text-sm text-red-500'>
						{errors.categoryId.message}
					</p>
				)}
				<p className='text-[13px] text-gray-500'>
					The existing category list can be seen in the{" "}
					<a className='underline text-blue-500' href='/admin/category'>
						category
					</a>{" "}
					menu
				</p>
			</div>
			<div className='w-full space-y-2'>
				<Label>Content</Label>
				<Controller
					name='content'
					control={control}
					render={({ field }) => (
						<RichTextEditor
							onContentChange={field.onChange}
							initialContent={field.value}
						/>
					)}
				/>
				{errors.content && (
					<p className='text-sm text-red-500'>{errors.content.message}</p>
				)}
			</div>
			<div className='flex justify-end gap-4'>
				<Button type='button' variant='outline'>
					Cancel
				</Button>
				<Button type='button' variant='secondary'>
					Preview
				</Button>
				<Button type='submit' disabled={isSubmitting}>
					{isSubmitting ? "Uploading..." : "Upload"}
				</Button>
			</div>
		</form>
	);
}

export default ArticleForm;

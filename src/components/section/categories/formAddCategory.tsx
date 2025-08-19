import React, { useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "../../ui/button";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryPayload, TCategoryPayload } from "@/src/lib/schemas";

import { createCategory } from "@/src/services/cetegories";

export function FormCategory({
	children,
	setData,
}: {
	children: React.ReactNode;
	setData: React.Dispatch<React.SetStateAction<any[]>>;
}) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<TCategoryPayload>({
		resolver: zodResolver(CategoryPayload),
	});

	const onSubmit: SubmitHandler<TCategoryPayload> = async (data) => {
		try {
			const response = await createCategory({
				name: data.name,
			});
			setData((prev) => [response, ...prev]);
		} catch (error) {
			alert("Username atau password salah!");
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='grid gap-2 pb-5'>
			<Label htmlFor='name'>Category</Label>
			<Input
				id='name'
				type='text'
				placeholder='Input category'
				{...register("name")}
			/>
			{errors.name && (
				<p className='text-sm text-red-600'>{errors.name.message}</p>
			)}
			<div className='flex justify-end pt-5 gap-2'>{children}</div>
		</form>
	);
}

"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Visibility } from "@/src/components/ui/visibility";
import { LoginSchema, TLoginSchema } from "@/src/lib/schemas";
import { login } from "@/src/services/login";

export function LoginForm() {
	const [isVisible, setIsVisible] = React.useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<TLoginSchema>({
		resolver: zodResolver(LoginSchema),
	});

	const onSubmit: SubmitHandler<TLoginSchema> = async (data) => {
		try {
			await login({ username: data.username, password: data.password });

			window.location.href = "/";
		} catch (error) {
			console.error("Login gagal:", error);
			alert("Username atau password salah!");
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			noValidate
			className='flex flex-col gap-6'>
			<div className='flex flex-col gap-3'>
				<div className='grid gap-2'>
					<Label htmlFor='username'>Username</Label>
					<Input
						id='username'
						type='text'
						placeholder='Input username'
						{...register("username")}
					/>
					{errors.username && (
						<p className='text-sm text-red-600'>
							{errors.username.message}
						</p>
					)}
				</div>
				<div className='grid gap-2'>
					<Label htmlFor='password'>Password</Label>
					<div className='relative'>
						<Input
							id='password'
							type={isVisible ? "text" : "password"}
							placeholder='Input password'
							{...register("password")}
						/>
						<Visibility
							className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer opacity-50 hover:opacity-100'
							visible={isVisible}
							toggleVisibility={() => setIsVisible(!isVisible)}
							size={20}
						/>
					</div>
					{errors.password && (
						<p className='text-sm text-red-600'>
							{errors.password.message}
						</p>
					)}
				</div>
			</div>
			<div className='flex flex-col gap-3'>
				<Button
					type='submit'
					disabled={isSubmitting}
					className='w-full bg-blue-600'>
					{isSubmitting ? "Logging in..." : "Login"}
				</Button>
			</div>
			<div className='text-center text-sm'>
				Don&apos;t have an account?{" "}
				<Link
					href='/register'
					className='underline underline-offset-4 text-blue-600'>
					Register
				</Link>
			</div>
		</form>
	);
}

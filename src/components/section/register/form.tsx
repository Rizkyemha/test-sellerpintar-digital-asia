"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/src/components/ui/select";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Visibility } from "@/src/components/ui/visibility";

import { RegisterSchema, TRegisterSchema, ROLES } from "@/src/lib/schemas";
import { register as registerUser } from "@/src/services/login";

export function RegisterForm() {
	const router = useRouter();
	const [isVisible, setIsVisible] = React.useState(false);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<TRegisterSchema>({
		resolver: zodResolver(RegisterSchema),
	});

	const onSubmit: SubmitHandler<TRegisterSchema> = async (data) => {
		try {
			await registerUser(data);
			alert("Registrasi berhasil! Silakan login.");
			router.push("/login");
		} catch (error) {
			console.error("Registrasi gagal:", error);
			alert("Registrasi gagal. Coba lagi.");
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
				<div className='grid gap-1'>
					<Label htmlFor='role'>Role</Label>
					<Controller
						control={control}
						name='role'
						render={({ field }) => (
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}>
								<SelectTrigger>
									<SelectValue placeholder='Select role' />
								</SelectTrigger>
								<SelectContent>
									{ROLES.map((role) => (
										<SelectItem key={role} value={role}>
											{role}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
					/>
					{errors.role && (
						<p className='text-sm text-red-600'>{errors.role.message}</p>
					)}
				</div>
			</div>

			<div className='flex flex-col gap-3'>
				<Button
					type='submit'
					disabled={isSubmitting}
					className='w-full bg-blue-600'>
					{isSubmitting ? "Mendaftar..." : "Register"}
				</Button>
			</div>

			<div className='text-center text-sm'>
				Already have an account?{" "}
				<Link
					href='/login'
					className='underline underline-offset-4 text-blue-600'>
					Login
				</Link>
			</div>
		</form>
	);
}

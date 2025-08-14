"use client";

import React, { useState } from "react";
import Link from "next/link";

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

import { RegisterSchema, ROLES } from "@/src/lib/schemas";

type RegisterFormError = {
	username?: string[];
	password?: string[];
	role?: string[];
};

export function RegisterForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
		role: "",
	});

	const [errors, setErrors] = useState({} as RegisterFormError);

	const [isVisible, setIsVisible] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleRoleChange = (value: string) => {
		setFormData((prev) => ({
			...prev,
			role: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setErrors({});

		const validationResult = RegisterSchema.safeParse(formData);

		if (!validationResult.success) {
			const formattedErrors = validationResult.error.flatten().fieldErrors;
			setErrors(formattedErrors);
		}

		alert("Form submitted!");
	};

	const toggleVisibility = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsVisible(!isVisible);
	};

	return (
		<form onSubmit={handleSubmit} noValidate className='flex flex-col gap-6'>
			<div className='flex flex-col gap-3'>
				<div className='grid gap-2'>
					<Label htmlFor='username'>Username</Label>
					<Input
						id='username'
						name='username'
						type='text'
						placeholder='Input username'
						value={formData.username}
						onChange={handleInputChange}
					/>
					{errors.username && (
						<p style={{ color: "red" }}>{errors.username[0]}</p>
					)}
				</div>
				<div className='grid gap-2'>
					<div className='flex items-center'>
						<Label htmlFor='password'>Password</Label>
					</div>
					<div className='relative'>
						<Input
							id='password'
							name='password'
							className='w-full'
							type={isVisible ? "text" : "password"}
							placeholder='Input password'
							value={formData.password}
							onChange={handleInputChange}
						/>
						<Visibility
							className='absolute right-2 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 hover:cursor-pointer'
							visible={isVisible}
							toggleVisibility={toggleVisibility}
							size={20}
						/>
					</div>
					{errors.password && (
						<p style={{ color: "red" }}>{errors.password[0]}</p>
					)}
				</div>
				<div className='grid gap-1'>
					<Label htmlFor='username'>Role</Label>
					<Select
						name='role'
						value={formData.role}
						onValueChange={handleRoleChange}>
						<SelectTrigger className='w-full'>
							<SelectValue placeholder='Select role' />
						</SelectTrigger>
						<SelectContent>
							{ROLES.map((role, index) => (
								<SelectItem key={index} value={role}>
									{role.charAt(0).toUpperCase() + role.slice(1)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{errors.role && <p style={{ color: "red" }}>{errors.role[0]}</p>}
				</div>
			</div>
			<div className='flex flex-col gap-3'>
				<Button type='submit' className='w-full bg-blue-600'>
					Register
				</Button>
			</div>
			<div className='text-center text-sm'>
				Don&apos;t have an account?{" "}
				<Link
					href='/login'
					className='underline underline-offset-4 text-blue-600'>
					Login
				</Link>
			</div>
		</form>
	);
}

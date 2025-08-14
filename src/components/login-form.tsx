"use client";

import React, { useState } from "react";

import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

import { Logo } from "./logo";
import { Visibility } from "./ui/visibility";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsVisible(!isVisible);
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card className='px-[16px] py-[40px] rounded-[12px] md:w-[400px]'>
				<CardHeader className='items-center'>
					<CardTitle className='flex justify-center'>
						<Logo className='self-center' />
					</CardTitle>
				</CardHeader>
				<CardContent className='p-[0]'>
					<form className='flex flex-col gap-6'>
						<div className='flex flex-col gap-3'>
							<div className='grid gap-2'>
								<Label htmlFor='username'>Username</Label>
								<Input
									id='username'
									type='text'
									placeholder='Input username'
									required
								/>
							</div>
							<div className='grid gap-2'>
								<div className='flex items-center'>
									<Label htmlFor='password'>Password</Label>
								</div>
								<div className='relative'>
									<Input
										id='password'
										className='w-full'
										type={isVisible ? "text" : "password"}
										required
										placeholder='Input password'
									/>
									<Visibility
										className='absolute right-2 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 hover:cursor-pointer'
										visible={isVisible}
										toggleVisibility={toggleVisibility}
										size={20}
									/>
								</div>
							</div>
						</div>
						<div className='flex flex-col gap-3'>
							<Button type='submit' className='w-full bg-blue-600'>
								Login
							</Button>
						</div>
						<div className='text-center text-sm'>
							Don&apos;t have an account?{" "}
							<a
								href='#'
								className='underline underline-offset-4 text-blue-600'>
								Register
							</a>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

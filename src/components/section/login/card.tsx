"use client";

import React from "react";
import { LoginForm } from "./form";
import { Logo } from "@/src/components/logo";

import { cn } from "@/src/lib/utils";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card";

export function LoginCard({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card className='px-[16px] py-[40px] rounded-[12px] md:w-[400px]'>
				<CardHeader className='items-center'>
					<CardTitle className='flex justify-center'>
						<Logo className='self-center' />
					</CardTitle>
				</CardHeader>
				<CardContent className='p-[0]'>
					<LoginForm />
				</CardContent>
			</Card>
		</div>
	);
}

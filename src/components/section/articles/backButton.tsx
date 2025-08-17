"use client";
import { ArrowLeft } from "lucide-react";

export function BackButton({ name }: { name?: string }) {
	const handleBack = () => {
		window.history.back();
	};

	return (
		<div className='flex items-center p-5 gap-2'>
			<button
				className='bg-gray-50 border-none border-0 p-0 rounded-none hover:cursor-pointer'
				onClick={handleBack}>
				<ArrowLeft size={20} />
			</button>
			<p>{name}</p>
		</div>
	);
}

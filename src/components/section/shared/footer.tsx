import { Logo } from "../../logo";

export function Footer() {
	return (
		<div className='box-border w-full flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 bg-blue-500 text-white p-12'>
			<Logo white />
			<p className='text-center text-[14px]'>
				© 2025 Blog genzet. All rights reserved.
			</p>
		</div>
	);
}

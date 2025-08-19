import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";

interface UserProfileProps {
	username: string;
	role: string;
}

export function UserProfile({ username, role }: UserProfileProps) {
	const router = useRouter();

	const handleClick = () => {
		if (role !== "Admin") {
			router.push("/articles");
			return;
		}
		router.push("/admin/articles");
	};

	return (
		<div className='w-[400px] bg-blue flex flex-col gap-9 items-center justify-center px-4 py-6'>
			<h3 className='font-semibold text-[20px]'>User Profile</h3>
			<div className='flex flex-col gap-6 w-full'>
				<Avatar className='w-[68px] h-[68px] mx-auto'>
					<AvatarImage src='https://github.com/shadcn.png' />
					<AvatarFallback>{username?.slice(0, 1)}</AvatarFallback>
				</Avatar>
				<div className='flex flex-col gap-3 w-full'>
					<div className='grid grid-cols-[80px_20px_1fr] bg-gray-100 border border-slate-200 py-[10px] px-3 rounded-[6px]'>
						<p className='font-semibold'>username</p>
						<p>:</p>
						<p className='text-center'>{username}</p>
					</div>
					<div className='grid grid-cols-[80px_20px_1fr] bg-gray-100 border border-slate-200 py-[10px] px-3 rounded-[6px]'>
						<p className='font-semibold'>password</p>
						<p>:</p>
						<p className='text-center'>************</p>
					</div>
					<div className='grid grid-cols-[80px_20px_1fr] bg-gray-100 border border-slate-200 py-[10px] px-3 rounded-[6px]'>
						<p className='font-semibold'>role</p>
						<p>:</p>
						<p className='text-center'>{role}</p>
					</div>
				</div>
			</div>
			<Button
				onClick={handleClick}
				className='w-full bg-blue-600 hover:cursor-pointer'>
				Back to dashboard
			</Button>
		</div>
	);
}

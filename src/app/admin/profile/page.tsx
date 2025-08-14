import { AdminTopNav } from "@/src/components/section/admin/topNav";
export default function Profile() {
	return (
		<div className='grid grid-cols-1 min-h-svh w-full bg-gray-100'>
			<AdminTopNav title='User Profile' />
		</div>
	);
}

import { AdminTopNav } from "@/src/components/section/admin/topNav";
export default function Articles() {
	return (
		<div className='grid grid-cols-1 min-h-svh w-full bg-gray-100'>
			<AdminTopNav title='Articles' />
			<div>ITEM</div>
		</div>
	);
}

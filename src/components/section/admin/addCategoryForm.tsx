import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

export default function AddCategory() {
	return (
		<div className='grid gap-2 pb-5'>
			<Label htmlFor='category'>Category</Label>
			<Input
				id='category'
				type='text'
				placeholder='Input category'
				required
			/>
			<p className='text-red-500'>Category field cannot be empty</p>
		</div>
	);
}

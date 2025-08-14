export default function Article({ params }: { params: { id: string } }) {
	const decodedSlug = decodeURIComponent(params.id);

	return (
		<div>
			<h1 className='text-2xl font-bold'>Menampilkan Artikel:</h1>
			<p className='mt-4 text-lg'>
				Anda sedang membaca artikel dengan slug:{" "}
				<span className='font-mono bg-gray-200 p-1 rounded'>
					{decodedSlug}
				</span>
			</p>
		</div>
	);
}

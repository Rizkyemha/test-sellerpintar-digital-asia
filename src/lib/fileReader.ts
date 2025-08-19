export const readFileAsDataURL = (file: any) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		// Jika berhasil, resolve Promise dengan hasilnya
		reader.onloadend = () => {
			resolve(reader.result);
		};

		// Jika gagal, reject Promise dengan error
		reader.onerror = () => {
			reject(reader.error);
		};

		// Memulai proses pembacaan file
		reader.readAsDataURL(file);
	});
};

import { uploadImage } from "@/src/services/articles";

const base64ToFile = (base64String: string, fileName: string): File => {
	const parts = base64String.split(";base64,");
	const contentType = parts[0].split(":")[1];
	const raw = window.atob(parts[1]);
	const rawLength = raw.length;
	const uInt8Array = new Uint8Array(rawLength);

	for (let i = 0; i < rawLength; ++i) {
		uInt8Array[i] = raw.charCodeAt(i);
	}

	const blob = new Blob([uInt8Array], { type: contentType });
	return new File([blob], fileName, { type: contentType });
};

export const processAndUploadImages = async (
	htmlContent: string | undefined | null
): Promise<string> => {
	if (!htmlContent) return "";

	const parser = new DOMParser();
	const doc = parser.parseFromString(htmlContent, "text/html");
	const images = doc.querySelectorAll("img");
	const uploadPromises: Promise<void>[] = [];

	images.forEach((imgElement) => {
		const src = imgElement.getAttribute("src");
		if (src && src.startsWith("data:image")) {
			const uploadPromise = (async () => {
				try {
					const fileName = `content-image-${Date.now()}.${
						src.split("/")[1].split(";")[0]
					}`;
					const imageFile = base64ToFile(src, fileName);
					const newImageUrl = await uploadImage(imageFile);
					imgElement.setAttribute("src", newImageUrl);
				} catch (error) {
					console.error("Gagal mengunggah gambar dari konten:", error);
				}
			})();
			uploadPromises.push(uploadPromise);
		}
	});

	await Promise.all(uploadPromises);
	return doc.body.innerHTML;
};

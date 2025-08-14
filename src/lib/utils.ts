import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { format, parse } from "date-fns";
import { id } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(
	dateInput: Date | string,
	formatStyle: string = "MMMM dd, yyyy HH:mm:ss"
): string {
	const dateObject =
		typeof dateInput === "string" ? new Date(dateInput) : dateInput;

	if (isNaN(dateObject.getTime())) {
		return "Tanggal tidak valid";
	}

	return format(dateObject, formatStyle, { locale: id });
}

export function parseCustomDateString(
	dateString: string,
	inputFormat: string
): Date | null {
	try {
		const parsedDate = parse(dateString, inputFormat, new Date());

		if (isNaN(parsedDate.getTime())) {
			return null;
		}
		return parsedDate;
	} catch (error) {
		console.error("Gagal mem-parse tanggal:", error);
		return null;
	}
}

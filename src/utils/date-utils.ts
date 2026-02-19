// Formato brasileiro completo: DD/MM/YYYY
export function formatDateToYYYYMMDD(date: Date): string {
	const day = date.getUTCDate().toString().padStart(2, "0");
	const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
	const year = date.getUTCFullYear();
	return `${day}/${month}/${year}`;
}

// Formato ISO: YYYY-MM-DD (para uso em metadados SEO)
export function formatDateToISO(date: Date): string {
	return date.toISOString().substring(0, 10);
}

// Formato curto para archive: DD-MM
export function formatDateShort(date: Date): string {
	const day = date.getUTCDate().toString().padStart(2, "0");
	const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
	return `${day}-${month}`;
}

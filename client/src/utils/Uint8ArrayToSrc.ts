export function DataToSrc(data: any): string {
	const bytes = new Uint8Array(data);
	const blob = new Blob([bytes], { type: "image/png" });
	return URL.createObjectURL(blob);
}

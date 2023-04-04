export const FormatDate = (date: Date) => {
	const year = new Date(date).getFullYear();
	const month = new Date(date).getMonth() + 1;
	const day = new Date(date).getDate();
	const hour = new Date(date).getHours();
	const minute = new Date(date).getMinutes();
	const second = new Date(date).getSeconds();

	return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

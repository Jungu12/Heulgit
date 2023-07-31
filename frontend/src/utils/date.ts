export const getYearAndMonth = (date: Date): string => {
	const year = date.getFullYear();
	const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다.

	return `${year}-${month}`;
};

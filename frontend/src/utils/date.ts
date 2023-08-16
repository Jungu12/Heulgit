export const getYearAndMonth = (date: Date): string => {
	const year = date.getFullYear();
	const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다.

	return `${year}-${month}`;
};

export function getTimeAgo(dateString: string): string {
	const now = new Date();
	const date = new Date(dateString);

	const timeDiff = now.getTime() - date.getTime();
	const seconds = Math.floor(timeDiff / 1000);

	if (seconds < 60) {
		return `방금 전`;
	}

	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) {
		return `${minutes}분 전`;
	}

	const hours = Math.floor(minutes / 60);
	if (hours < 24) {
		return `${hours}시간 전`;
	}

	const days = Math.floor(hours / 24);
	if (days < 30) {
		return `${days}일 전`;
	}

	const months = Math.floor(days / 30);
	if (months < 12) {
		return `${months}달 전`;
	}

	const years = Math.floor(months / 12);
	return `${years}년 전`;
}

export function formatDateFromString(dateTimeString: string): string {
	const inputDate = new Date(dateTimeString);

	const year = inputDate.getFullYear();
	const month = String(inputDate.getMonth() + 1).padStart(2, '0');
	const day = String(inputDate.getDate()).padStart(2, '0');
	const hours = String(inputDate.getHours()).padStart(2, '0');
	const minutes = String(inputDate.getMinutes()).padStart(2, '0');

	return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export function isWithinOneMonth(dateString: string): boolean {
	const today = new Date();
	const targetDate = new Date(dateString);

	// Calculate the difference in milliseconds between the two dates
	const timeDiff = Math.abs(targetDate.getTime() - today.getTime());

	// Calculate the difference in days
	const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

	// Check if the difference in days is within 30 days (1 month)
	return daysDiff <= 30;
}

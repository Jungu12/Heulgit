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

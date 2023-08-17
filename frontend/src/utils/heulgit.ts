import { UserType } from '@typedef/common.types';

export function getSortType(sortName: string) {
	if (sortName === '좋아요 많은 순') {
		return 'likes';
	}

	if (sortName === '스타 많은 순') {
		return 'stars';
	}
}

export function findLikeUser(userList: UserType[], userId: string) {
	if (userList.length === 0) return false;

	for (const user of userList) {
		if (user.githubId === userId) {
			return true;
		}
	}
	return false;
}

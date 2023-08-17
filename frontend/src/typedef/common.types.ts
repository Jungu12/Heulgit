export type AuthType = {
	accessToken: string;
};

export type SortType = {
	empty: boolean;
	sorted: boolean;
	unsorted: boolean;
};

export type PageableType = {
	sort: SortType;
	offset: number;
	pageNumber: number;
	pageSize: number;
	paged: boolean;
	unpaged: boolean;
};

export type UserType = {
	githubId: string;
	avatarUrl: string;
	name: string;
	bio: string;
	company: string;
	location: string;
	blog: string;
};

export type LikedUserListResponse = {
	content: [
		{
			user: UserType;
			follow: boolean;
		},
	];
	pageable: PageableType;
	size: number;
	number: number;
	sort: SortType;
	first: boolean;
	last: boolean;
	numberOfElements: 1;
	empty: boolean;
};

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

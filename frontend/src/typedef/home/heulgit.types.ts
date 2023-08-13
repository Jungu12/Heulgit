import { PageableType, SortType, UserType } from '@typedef/common.types';

export type HeulGitPostType = {
	heulgitId: number;
	githubId: string;
	avatarUrl: string;
	heulgitName: boolean;
	updatedDate: string;
	content: string;
	star: number;
	view: number;
	language: string;
	heulgitComments: [];
	registered: boolean;
	likedUsers: UserType[];
};

export type HeulgitPostResponseType = {
	content: HeulGitPostType[];
	pageable: PageableType;
	size: number;
	number: number;
	sort: SortType;
	numberOfElements: number;
	first: boolean;
	last: boolean;
	empty: boolean;
};

export type HeulGitCommentType = {
	id: number;
	user: {
		id: string;
		avater_url: string;
	};
	content: string;
	updated_date: string;
	parent_id: number;
	order: number;
};

export type ProgrammingLanguageType = {
	id: number;
	name: string;
	img: string;
};

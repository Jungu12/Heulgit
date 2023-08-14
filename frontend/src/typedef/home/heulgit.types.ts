import { PageableType, SortType, UserType } from '@typedef/common.types';

export type HeulGitPostType = {
	heulgitId: number;
	githubId: string;
	avatarUrl: string;
	heulgitName: string;
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
	commentId: number;
	user: UserType;
	content: string;
	updatedDate: string;
	parentComment: null | number;
};

export type ProgrammingLanguageType = {
	id: number;
	name: string;
	img: string;
};

export type HeulgitCommentWriteType = {
	content: string;
	heulgitId: number;
	mentioedFollowers: [];
	parentId: null | number;
};

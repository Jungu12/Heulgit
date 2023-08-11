import { UserType } from '@typedef/common.types';

// 자유게시판 게시물
export type FreeBoardPostType = {
	freeBoardId: number;
	user: UserType;
	title: string;
	content: string;
	updatedDate: string;
	view: number;
	likedUsers: UserType[];
	freeBoardComments: FreeBoardCommentType[];
	freeBoardImages: FreeBoardImageType[];
};

// 자유게시판 전체 게시물(피드 페이지네이션 반환)
export type FreeBoarFeedResponseType = {
	content: FreeBoardPostType[];
	pageable: {
		sort: {
			empty: boolean;
			sorted: boolean;
			unsorted: boolean;
		};
		offset: number;
		pageNumber: number;
		pageSize: number;
		paged: boolean;
		unpaged: boolean;
	};
	size: number;
	number: number;
	sort: {
		empty: true;
		sorted: false;
		unsorted: true;
	};
	numberOfElements: number;
	first: true;
	last: true;
	empty: true;
};

// 자유게시판 게시물 댓글
export type FreeBoardCommentType = {
	commentId: number;
	user: {
		githubId: string;
		avatarUrl: string;
		name: string;
		bio: string;
		company: string;
		location: string;
		blog: string;
	};
	content: string;
	updatedDate: string;
	parentComment: null;
};

// 자유게시판 단일 게시물 좋아요 사용자 목록
export type FreeBoardPostLikedType = {
	userType: UserType;
};

// 자유게시판 피드 페이지네이션 반환 타입
export type FreeBoardFeedResponseType = {
	content: [];
	pageable: {
		sort: {
			empty: boolean;
			sorted: boolean;
			unsorted: boolean;
		};
		offset: number;
		pageNumber: number;
		pageSize: number;
		paged: boolean;
		unpaged: boolean;
	};
	size: number;
	number: number;
	sort: {
		empty: true;
		sorted: false;
		unsorted: true;
	};
	numberOfElements: number;
	first: true;
	last: true;
	empty: true;
};

// 자유게시판 이미지
export type FreeBoardImageType = {
	freeBoardImageId: number;
	fileUri: string;
};

// 자유게시판 게시물 글쓰기 타입
export type FreeBoardWriteType = {
	title: string;
	content: string;
};

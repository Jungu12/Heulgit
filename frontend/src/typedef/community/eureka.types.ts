import { UserType } from '@typedef/common.types';

// 유레카 게시물
export type EurekaPostType = {
	eurekaId: number;
	user: UserType;
	title: string;
	content: string;
	updatedDate: string;
	view: number;
	link: string;
	eurekaImages: EurekaImageType[];
	likedUsers: UserType[];
	eurekaComments: EurekaCommentType[];
	eurekaGithubInfo: EurekaGithubInfoType;
	eurekaLabels: EurekaLabelType[];
};

// 유레카 게시물 댓글
export type EurekaCommentType = {
	commentId: number;
	user: UserType;
	content: string;
	updatedDate: string;
	parentComment: number | null;
};

// 유레카 단일 게시물 좋아요 사용자 목록
export type EurekaPostLikedType = {
	users: {
		id: 'jungu12';
		avater_url: 'efefasdfawewef';
		is_follwer: true;
	}[];
};

// 유레카 피드 페이지네이션 반환 타입
export type EurekaFeedResponseType = {
	content: EurekaPostType[];
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

// 유레카 게시글 반환 타입
export type EurekaPostResponseType = {
	eurekaId: number;
	user: UserType;
	title: string;
	content: string;
	updatedDate: string;
	view: number;
	link: string;
	eurekaImages: EurekaImageType[];
	likedUsers: UserType[];
	eurekaComments: EurekaCommentType[];
	eurekaGithubInfo: EurekaGithubInfoType;
	eurekaLabels: EurekaLabelType[];
};

export type EurekaImageType = {
	eurekaImageId: number;
	fileUri: string;
};

export type EurekaGithubInfoType = {
	title: string;
	state: boolean;
	updatedDate: string;
	body: string;
	comments: number;
};

export type EurekaLabelType = {
	name: string;
	description: string;
};

// 유레카 게시글 쓰기 타입
export type EurekaWriteType = {
	title: string;
	content: string;
	link: string;
};

// 유레카 댓글 쓰기 타입
export type EurekaCommentWriteType = {
	content: string;
	eurekaId: number;
	mentionedFollowers: string[];
	parentId: number;
};

// 유레카 링크 라벨 타입
export type LabelType = {
	name: string;
	description: string;
};

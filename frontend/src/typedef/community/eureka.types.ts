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
	id: number;
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

// 유레카 게시물
export type EurekaPostType = {
	id: number;
	title: string;
	user: {
		id: string;
		avater_url: string;
	};
	content: string;
	link: string;
	updated_date: string;
	views: number;
	likes: number;
	comments: number;
	images: { file_uri: string }[];
};

// 유레카 게시물 댓글
export type EurekaCommentType = {
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

// 유레카 단일 게시물 좋아요 사용자 목록
export type EurekaPostLikedType = {
	users: {
		id: 'jungu12';
		avater_url: 'efefasdfawewef';
		is_follwer: true;
	}[];
};

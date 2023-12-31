// 팔로우 상태 확인
export type FollowType = {
	follow: boolean;
};

// 팔로잉/팔로워
export type UserFollowingType = {
	id: string;
	avater_url: string;
	follow: boolean;
};

// 사용자 커밋 분석
export type UserCommitType = {
	type: string;
	count: number;
};

// POST 사용자 커밋 맵 커스텀
export type UserCommitCustomType = {
	type: string;
	description: string;
};

// POST 사용자 커밋 맵 커스텀 받아오기
export type UserCommitCustomData = {
	githubId: string;
	type: string;
	description: string;
};

// 랭킹
export type UserRankingType = {
	githubId: string;
	count: number;
};

// 내 활동 - 좋아요한 게시물
export type UserLikePostType = {
	posts: [
		{
			type: string;
			id: number;
			user: {
				id: string;
				avater_url: string;
			};
			title: string;
			content: string;
			updated_date: string;
			views: number;
			comments: number;
			likes: number;
		},
	];
};

// 작성한 댓글
export type UserCommentType = {
	commentId: number;
	commentType: string;
	content: string;
	githubId: string;
	updatedDate: string;
};

// 자유게시판 전체 게시물(피드 페이지네이션 반환)
export type UserCommentResponseType = {
	content: UserCommentType[];
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

// 작성한 유레카/자유
export type UserPostType = {
	avatar_url: string;
	posts: [
		{
			id: number;
			title: string;
			content: string;
			link: string;
			updated_date: string;
			views: number;
			likes: number;
			comments: number;
			images: [
				{
					file_uri: string;
				},
			];
		},
	];
};

// // 작성한 자유게시판
// export type UserFreeboardType = {
// 	avatar_url: 'dfdsfsdfds';
// 	posts: [
// 		{
// 			id: 1;
// 			title: 'hihi';
// 			content: 'eqweqwewq';
// 			link: 'dfkldfsdfds';
// 			updated_date: '2023-07-24';
// 			views: 100;
// 			likes: 10;
// 			comments: 12;
// 			images: [
// 				{
// 					file_uri: 'adfldskfjsdlk';
// 				},
// 			];
// 		},
// 	];
// };

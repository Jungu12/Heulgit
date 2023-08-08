// 사용자 커밋 분석
export type UserCommitType = {
	commitInfos: [
		{
			type: string;
			count: number;
		},
	];
};

// POST 사용자 커밋 맵 커스텀
export type UserCommitCustomType = {
	map: [{ string: string }];
};

// 랭킹
export type UserRankingType = {
	github_id: string;
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
	posts: [
		{
			id: number;
			type: string;
			updated_date: string;
			content: string;
		},
	];
};

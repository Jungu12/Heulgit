export type FreeBoardPostType = {
	id: number;
	title: string;
	user: {
		id: string;
		avater_url: string;
	};
	images: { file_uri: string }[];
	updated_date: string;
	content: string;
	likes: number;
	comments: number;
	views: number;
};

export type FreeBoardCommentType = {
	id: number;
	user: {
		id: string;
		avater_url: string;
	};
	content: string;
	updated_date: string;
	parent_id: number;
};

export type EurekaPostType = {
	id: 1;
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
	images: [file_uri: string];
};

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

export type HeulGitPostType = {
	id: number;
	name: string;
	user: {
		id: string;
		avater_url: string;
		is_registered: boolean;
	};
	updated_date: string;
	content: string;
	likes: number;
	comments: number;
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

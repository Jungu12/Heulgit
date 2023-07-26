export type HuelGitPostType = {
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

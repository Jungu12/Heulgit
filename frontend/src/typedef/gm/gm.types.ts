export type MessageType = {
	roomId: string;
	sender: string;
	message: string;
	updatedTime: string;
	read: boolean;
};

export type ChatRoomType = {
	roomId: string;
	user1: UserDetailType;
	user2: UserDetailType;
	chatMessages: MessageType[];
};

export type UserDetailType = {
	id: string;
	avatar_url: string;
};

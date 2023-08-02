export type MessageType = {
	roomId: string;
	sender: string;
	message: string;
	updatedTime: string;
	isRead: boolean;
};

export type ChatRoomType = {
	roomId: string;
	user1: string;
	user2: string;
	chatMessages: MessageType[];
};

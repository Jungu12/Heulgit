import { ChatRoomType, MessageType } from '@typedef/gm/gm.types';

export const findPartner = (userId: string, room: ChatRoomType) => {
	return userId === room.user1.id ? room.user2 : room.user1;
};

export const findUnReadMessage = (id: string, messageList: MessageType[]) => {
	let count = 0;
	messageList = messageList.reverse();

	for (const message of messageList) {
		if (message.sender === id) continue;
		if (message.read) break;
		count++;
	}
	return count;
};

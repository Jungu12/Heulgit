import { MessageType } from '@typedef/gm/gm.types';

export const findParter = (id: string, user1: string, user2: string) => {
	if (id === user1) {
		return user2;
	}
	return user1;
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

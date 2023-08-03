// eslint-disable-next-line import/no-extraneous-dependencies
import { CompatClient } from '@stomp/stompjs';
import { MessageType } from '@typedef/gm/gm.types';

type Props = {
	client: CompatClient;
	sender: string;
	message: string;
	roomId: string;
	chatMessages: MessageType[];
	setChatMessageList: (message: MessageType[]) => void;
	setRoomId: (roomId: string) => void;
	setChatName: (name: string) => void;
	setIsChat: (isChat: boolean) => void;
	deleteMessage: () => void;
};

const useHandleChat = ({
	client,
	sender,
	message,
	roomId,
	chatMessages,
	setChatMessageList,
	setRoomId,
	setChatName,
	setIsChat,
	deleteMessage,
}: Props) => {
	const sendHandler = () => {
		console.log('room Id:' + roomId);
		console.log(sender);
		console.log(message);
		console.log(client);
		client.send(
			'/pub/chat/message',
			{},
			JSON.stringify({
				type: 'TALK',
				roomId: roomId,
				sender: sender,
				message: message,
			}),
		);
		deleteMessage();
	};

	const connectHandler = (mockId: string, mockName: string) => {
		console.log(client);
		console.log(mockId);
		client.connect({}, () => {
			client.subscribe(
				`/sub/chat/room/${mockId}`,
				(messages) => {
					console.log(messages.body);
					setChatMessageList(chatMessages.concat(JSON.parse(messages.body)));
				},
				{},
			);
		});

		setChatName(mockName);
		setRoomId(mockId);
		setIsChat(true);
	};

	return { sendHandler, connectHandler };
};

export default useHandleChat;

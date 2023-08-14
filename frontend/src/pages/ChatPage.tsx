import Header from '@components/common/Header';
import UserLog from '@components/profile/UserLog';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { RootState } from '@store/index';
import { ChatRoomType, MessageType } from '@typedef/gm/gm.types';
import { authHttp } from '@utils/http';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { styled } from 'styled-components';

const StyledChatPage = styled.div``;
const StyledHeader = styled.div`
	width: 100%;
	height: 56px;
	margin-bottom: 10px;
`;
const StyledChatList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 22px;
	padding: 15px;
`;

const ChatPage = () => {
	const [chatRoomList, setChatRoomList] = useState<ChatRoomType[]>([]);
	const [newMessage, setnewMessage] = useState<MessageType | null>(null);
	const client = useRef<CompatClient>();
	const navigation = useNavigate();
	const accessToken = useSelector((state: RootState) => state.auth.token);

	// 채팅방 연결 함수
	const connectHandler = useCallback(() => {
		client.current = Stomp.over(() => {
			const sock = new SockJS('wss://i9d211.p.ssafy.io/gm', {
				headers: { Authorization: `Bearer ${accessToken}` },
			});
			return sock;
		});
	}, []);

	client.current?.configure({
		connectHeaders: {
			Authorization: 'Bearer ' + (accessToken ? accessToken : ''),
		},
	});

	const loadChatRoomList = useCallback(
		(id: string) => {
			authHttp.get<ChatRoomType[]>(`gm/chatrooms/${id}`).then((res) => {
				console.log(res);
				console.log('받아온 데이터 그대로 : ', res);

				connectHandler();
				// 모든 채팅방 소켓 열기
				res.forEach((room) => {
					client.current!.connect(
						{
							Authorization: accessToken,
						},
						() => {
							console.log('소켓 오픈~', accessToken);

							client.current!.subscribe(
								`/sub/chat/room/${room.roomId}`,
								(msg) => {
									const sendMsg: MessageType = JSON.parse(msg.body);
									setnewMessage(sendMsg);
									console.log(sendMsg.message, chatRoomList);

									// setChatRoomList(updatedChatRoomList);
								},
								{
									Authorization: accessToken ? accessToken : '',
									simpDestination: room.roomId,
								},
							);
						},
					);
				});

				setChatRoomList(res);
			});
		},
		[accessToken, client],
	);

	const findPartnerId = useCallback((room: ChatRoomType) => {
		return 'ksg2388' === room.user1 ? room.user2 : room.user1;
	}, []);

	const getLastMessage = useCallback((room: ChatRoomType) => {
		return room.chatMessages.length === 0
			? '-'
			: room.chatMessages[room.chatMessages.length - 1].message;
	}, []);

	const getLastMessageTime = useCallback((room: ChatRoomType) => {
		return room.chatMessages.length === 0
			? '-'
			: room.chatMessages[room.chatMessages.length - 1].updatedTime;
	}, []);

	const onClickChatRoom = useCallback((room: ChatRoomType) => {
		navigation(room.roomId, { state: { room: room } });
	}, []);

	// 테스트용
	const onClickTestButton = useCallback(() => {
		console.log('준구 리스트');
		loadChatRoomList('jungu12');
	}, []);

	useEffect(() => {
		loadChatRoomList('ksg2388');

		return () => {
			client.current!.disconnect();
		};
	}, []);

	// 새로운 메시지 오면 화면 다시
	useEffect(() => {
		if (newMessage) {
			const updatedChatRoomList = chatRoomList.map((prevRoom) => {
				if (prevRoom.roomId === newMessage.roomId) {
					return {
						...prevRoom,
						chatMessages: [...prevRoom.chatMessages, newMessage],
					};
				}
				return prevRoom;
			});
			console.log('ㅅㅂ..', chatRoomList);

			console.log('업데이트 후 :', updatedChatRoomList);
			setChatRoomList(updatedChatRoomList);
		}
		// 룸ID 같은 값 찾아서 message 내용 바꿔주기
	}, [newMessage]);

	return (
		<StyledChatPage>
			<StyledHeader>
				<Header
					title={'깃속말'}
					children={<button onClick={onClickTestButton}>test</button>}
				/>
			</StyledHeader>
			<StyledChatList>
				{chatRoomList.length &&
					chatRoomList.map((room) => (
						<div onClick={() => onClickChatRoom(room)}>
							<UserLog
								userLName={findPartnerId(room)}
								userLog={getLastMessage(room)}
								logDate={getLastMessageTime(room)}
							/>
						</div>
					))}
			</StyledChatList>
		</StyledChatPage>
	);
};

export default ChatPage;

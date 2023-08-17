import Header from '@components/common/Header';
import UserLog from '@components/profile/UserLog';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { RootState } from '@store/index';
import { ChatRoomType, MessageType } from '@typedef/gm/gm.types';
import { findUnReadMessage } from '@utils/gm';
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

const StyledNoImage = styled.div`
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: center;
	font-size: 24px;
	font-weight: 700;
	height: calc(100vh - 56px);
`;

const ChatPage = () => {
	const user = useSelector((state: RootState) => state.user.user);
	const [chatRoomList, setChatRoomList] = useState<ChatRoomType[]>([]);
	const [newMessage, setnewMessage] = useState<MessageType | null>(null);
	const client = useRef<CompatClient>();
	const navigation = useNavigate();
	const accessToken = useSelector((state: RootState) => state.auth.token);

	// 채팅방 연결 함수
	const connectHandler = useCallback(() => {
		client.current = Stomp.over(() => {
			const sock = new SockJS('https://i9d211.p.ssafy.io/api/gm', {
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
							client.current!.subscribe(
								`/sub/chat/room/${room.roomId}`,
								(msg) => {
									const sendMsg: MessageType = JSON.parse(msg.body);
									setnewMessage(sendMsg);
									console.log(sendMsg.message, chatRoomList);
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

	const chatRoomSort = useCallback(() => {
		chatRoomList.sort(
			(room1, room2) =>
				new Date(
					room1.chatMessages[room1.chatMessages.length - 1].updatedTime,
				).getTime() -
				new Date(
					room2.chatMessages[room2.chatMessages.length - 1].updatedTime,
				).getTime(),
		);
	}, [chatRoomList]);

	useEffect(() => {
		loadChatRoomList('ksg2388');

		return () => {
			client.current!.disconnect();
		};
	}, []);

	// 채팅방 시간 순으로 정렬
	useEffect(() => {
		chatRoomSort();
	}, [chatRoomList]);

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
			setChatRoomList(updatedChatRoomList);
		}
		// 룸ID 같은 값 찾아서 message 내용 바꿔주기
	}, [newMessage]);

	return (
		<StyledChatPage>
			{user && (
				<>
					<StyledHeader>
						<Header title={'깃속말'} />
					</StyledHeader>
					<StyledChatList>
						{chatRoomList.length ? (
							chatRoomList.map((room) => (
								<div onClick={() => onClickChatRoom(room)}>
									<UserLog
										userLName={findPartnerId(room)}
										userLog={getLastMessage(room)}
										logDate={getLastMessageTime(room)}
										unReadNum={findUnReadMessage(
											user.githubId,
											room.chatMessages,
										)}
									/>
								</div>
							))
						) : (
							<StyledNoImage>채팅 목록이 없습니다.</StyledNoImage>
						)}
					</StyledChatList>
				</>
			)}
		</StyledChatPage>
	);
};

export default ChatPage;

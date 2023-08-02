import Header from '@components/common/Header';
import UserLog from '@components/profile/UserLog';
import { ChatRoomType } from '@typedef/gm/gm.types';
import { http } from '@utils/http';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
	const navigation = useNavigate();

	const loadChatRoomList = useCallback((id: string) => {
		http
			.get<ChatRoomType[]>(`http://192.168.100.64:8080/gm/chatrooms/${id}`)
			.then((res) => {
				console.log(res);
				console.log('받아온 데이터 그대로 : ', res);

				setChatRoomList(res);
			});
	}, []);

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

	useEffect(() => {
		loadChatRoomList('ksg2388');
	}, []);

	useEffect(() => {
		console.log('[chatRoomList]', chatRoomList);
	}, [chatRoomList]);

	return (
		<StyledChatPage>
			<StyledHeader>
				<Header title={'깃속말'} />
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

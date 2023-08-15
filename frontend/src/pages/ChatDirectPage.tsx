import React, {
	useState,
	KeyboardEvent,
	useRef,
	useEffect,
	useCallback,
} from 'react';
import Header from '@components/common/Header';
import ChatBox from '@components/gm/ChatBox';
import { colors } from '@constants/colors';
import { styled } from 'styled-components';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useLocation } from 'react-router';
import { ChatRoomType, MessageType } from '@typedef/gm/gm.types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CompatClient, Stomp } from '@stomp/stompjs';
// eslint-disable-next-line import/no-extraneous-dependencies
import SockJS from 'sockjs-client';
import { authHttp } from '@utils/http';
import { RootState } from '@store/index';
import { useSelector } from 'react-redux';
import { findParter } from '@utils/gm';

const StyledChatDirectPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: calc(var(--vh, 1vh) * 100);
`;

const StyledHeader = styled.div`
	width: 100%;
	height: 56px;
`;

const StyledMessage = styled.div`
	word-wrap: break-word;
	word-break: break-all;
	margin-bottom: 50px;
	height: calc((var(--vh, 1vh) * 100) - 102px);
	overflow: scroll;
`;

const StyledFooter = styled.div`
	z-index: 1;
	position: fixed;
	bottom: 0px;
	width: 100%;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: white;
`;

const StyledInputWrap = styled.div`
	width: 100%;
	padding: 0 10px;
`;
type StyledInputDivProps = {
	$isEmpty: boolean;
};
const StyledInputDiv = styled.div<StyledInputDivProps>`
	display: flex;
	border: 1px solid
		${({ $isEmpty }) =>
			$isEmpty ? colors.greyScale.grey3 : colors.primary.primary};
	border-radius: 8px;
	padding: 2px 6px;
	height: 35px;
`;

const StyledInput = styled.input`
	outline: none;
	width: 100%;
`;

const StyledButton = styled.button`
	width: 50px;
	height: 35px;
	margin-right: 10px;
	/* border: 1px solid ${colors.primary.primary}; */
	background-color: ${colors.primary.primary};
	color: white;
	border-radius: 8px;
	cursor: pointer;
`;

type RouteState = {
	state: {
		room: ChatRoomType;
	};
};

const ChatDirectPage = () => {
	const user = useSelector((state: RootState) => state.user.user);
	const { state } = useLocation() as RouteState;
	const client = useRef<CompatClient>();
	const messageEndRef = useRef<HTMLDivElement | null>(null);
	const [messageList, setMessageList] = useState<MessageType[]>([]);
	const [message, setMessage] = useState<MessageType>();
	const [inputMessage, setInputMessage] = useState('');
	const accessToken = useSelector(
		(reduxsState: RootState) => reduxsState.auth.token,
	);

	const headers = {
		Authorization: `Bearer ${accessToken}`,
	};

	// 채팅방 연결 함수
	const connectHandler = useCallback(
		(roomId: string) => {
			console.log('연결 시작', headers);

			client.current = Stomp.over(() => {
				const sock = new SockJS('https://i9d211.p.ssafy.io/api/gm');
				return sock;
			});

			client.current?.configure({
				connectHeaders: {
					Authorization: 'Bearer ' + (accessToken ? accessToken : ''),
				},
			});

			setMessageList([...state.room.chatMessages]);
			client.current.connect(headers, () => {
				client.current?.subscribe(
					`/sub/chat/room/${roomId}`,
					(msg) => {
						setMessage(JSON.parse(msg.body));
					},
					{
						Authorization: accessToken ? accessToken : '',
						simpDestination: roomId,
					},
				);
			});
		},
		[accessToken, state, client],
	);

	// 메세지 보내기 함수
	const sendHandler = useCallback(() => {
		if (inputMessage.trim() === '') return;
		console.log(inputMessage);

		const newMessage = {
			roomId: state.room.roomId,
			sender: 'ksg2388',
			message: inputMessage,
			read: true,
			updatedTime: new Date().toString(),
		};

		client.current?.send(
			'/pub/chat/message',
			{
				Authorization: accessToken,
			},
			JSON.stringify(newMessage),
		);

		setInputMessage('');
	}, [inputMessage, accessToken, client]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputMessage(e.target.value);
	};

	const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			sendHandler();
		}
	};

	const loadChatRoomLog = useCallback((id: string) => {
		authHttp.get<MessageType[]>(`gm/chats/${id}`).then((res) => {
			// console.log(res);
			setMessageList([...res]);
			// setChatRoomList(res);
		});
	}, []);

	useEffect(() => {
		console.log('[메세지 리스트]', messageList);

		if (messageEndRef.current) {
			messageEndRef.current.scrollIntoView({
				behavior: 'auto',
				block: 'end',
				inline: 'nearest',
			});
		}
	}, [messageList]);

	// useEffect(() => {
	// 	console.log(inputMessage);
	// }, [inputMessage]);

	// useEffect(() => {
	// 	console.log('[message]', state.room.chatMessages);
	// }, [state]);

	useEffect(() => {
		console.log('채팅방 입장 : ', state);

		connectHandler(state.room.roomId);

		return () => {
			console.log('채팅방 나감');
		};
	}, []);

	useEffect(() => {
		console.log('[message 변경 됨?]', message);

		if (message) {
			setMessageList((prev) => [...prev, message]);
		}
		console.log('[새로운 메시지 추가]', message);
	}, [message]);

	useEffect(() => {
		if (state.room) {
			loadChatRoomLog(state.room.roomId);
		}
	}, [state.room.roomId]);

	return (
		<StyledChatDirectPageContainer>
			{user && (
				<>
					<StyledHeader>
						<Header
							title={findParter(
								user?.githubId,
								state.room.user1,
								state.room.user2,
							)}
						/>
					</StyledHeader>
					<StyledMessage>
						{messageList.map((msg, index) => (
							<ChatBox
								key={index}
								message={msg.message}
								$isUser={msg.sender === user?.githubId}
							/>
						))}
						<div ref={messageEndRef}></div>
					</StyledMessage>
					<StyledFooter>
						<StyledInputWrap>
							<StyledInputDiv $isEmpty={inputMessage === ''}>
								<StyledInput
									type="text"
									value={inputMessage}
									onChange={handleInputChange}
									onKeyDown={handleKeyPress}
								/>
							</StyledInputDiv>
						</StyledInputWrap>
						<StyledButton onClick={sendHandler}>전송</StyledButton>
					</StyledFooter>
				</>
			)}
		</StyledChatDirectPageContainer>
	);
};

export default ChatDirectPage;

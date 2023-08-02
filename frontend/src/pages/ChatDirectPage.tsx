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
import { http } from '@utils/http';

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
`;

type RouteState = {
	state: {
		room: ChatRoomType;
	};
};

const ChatDirectPage = () => {
	const { state } = useLocation() as RouteState;
	const client = useRef<CompatClient>();
	const messageEndRef = useRef<HTMLDivElement | null>(null);
	const [messageList, setMessageList] = useState<MessageType[]>([]);
	const [message, setMessage] = useState<MessageType>();
	const [inputMessage, setInputMessage] = useState('');

	// 채팅방 연결 함수
	const connectHandler = useCallback((roomId: string) => {
		client.current = Stomp.over(() => {
			const sock = new SockJS('http://192.168.100.64:8080/gm');
			return sock;
		});

		setMessageList([...state.room.chatMessages]);
		client.current.connect({}, () => {
			client.current!.subscribe(
				`/sub/chat/room/${roomId}`,
				(msg) => {
					setMessage(JSON.parse(msg.body));
				},
				{ Authorization: '', simpDestination: roomId },
			);
		});
	}, []);

	// 메세지 보내기 함수
	const sendHandler = useCallback(() => {
		if (inputMessage.trim() === '') return;
		console.log(inputMessage);

		client.current?.send(
			'/pub/chat/message',
			{},
			JSON.stringify({
				roomId: state.room.roomId,
				sender: 'ksg2388',
				message: inputMessage,
			}),
		);
		setInputMessage('');
	}, [inputMessage]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputMessage(e.target.value);
	};

	const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			sendHandler();
		}
	};

	const loadChatRoomLog = useCallback((id: string) => {
		http
			.get<MessageType[]>(`http://192.168.100.64:8080/gm/chats/${id}`)
			.then((res) => {
				// console.log(res);
				setMessageList([...res]);
				// setChatRoomList(res);
			});
	}, []);

	useEffect(() => {
		// console.log('[메세지 리스트]', messageList);

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
		connectHandler(state.room.roomId);
	}, []);

	useEffect(() => {
		if (message) {
			setMessageList([...messageList, message]);
		}
		// console.log(message);
	}, [message]);

	useEffect(() => {
		loadChatRoomLog(state.room.roomId);
	}, [state.room.roomId]);

	return (
		<StyledChatDirectPageContainer>
			<StyledHeader>
				<Header title={'userName'} />
			</StyledHeader>
			<StyledMessage>
				{messageList.map((msg, index) => (
					<ChatBox
						key={index}
						message={msg.message}
						$isUser={msg.sender === 'ksg2388'}
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
						<button>사진</button>
					</StyledInputDiv>
				</StyledInputWrap>
				<StyledButton onClick={sendHandler}>전송</StyledButton>
			</StyledFooter>
		</StyledChatDirectPageContainer>
	);
};

export default ChatDirectPage;

import Header from '@components/common/Header';
import UserLog from '@components/profile/UserLog';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const StyledChatPage = styled.div``;
const StyledHeader = styled.div`
	width: 100%;
	height: 56px;
	margin-bottom: 10px;
`;
const StyledChatList = styled.div`
	padding: 20px;
`;

const ChatPage = () => {
	const navigation = useNavigate();

	return (
		<StyledChatPage>
			<StyledHeader>
				<Header title={'깃속말'} />
			</StyledHeader>
			<StyledChatList>
				<div onClick={() => navigation('1')}>
					<UserLog userLName={'bbing.pong'} userLog={'ㅋㅋㅋㅋ'} logDate={3} />
				</div>{' '}
			</StyledChatList>
		</StyledChatPage>
	);
};

export default ChatPage;

import { colors } from '@constants/colors';
import React from 'react';
import { styled } from 'styled-components';

type MessageItemProps = {
	message: string;
	$isUser: boolean;
};

const StyledMessageBox = styled.div<{ $isUser: boolean }>`
	display: flex;
	justify-content: ${(props) => (props.$isUser ? 'right' : 'left')};
	align-content: center;
`;
const StyledMessageItem = styled.div<{ $isUser: boolean }>`
	margin: 10px;
	padding: 10px;

	border: 1px solid
		${(props) =>
			props.$isUser ? colors.primary.primaryLighten : colors.greyScale.grey3};
	border-radius: 15px;
	background-color: ${(props) =>
		props.$isUser ? colors.primary.primaryLighten : 'white'};
	max-width: 75%;
`;
const StyledUserImage = styled.img`
	width: 36px;
	height: 36px;
	border-radius: 50%;
	margin: 10px 0 0 10px;
	background-color: black;
`;

const ChatBox: React.FC<MessageItemProps> = ({ message, $isUser }) => {
	return (
		<StyledMessageBox $isUser={$isUser}>
			{!$isUser && <StyledUserImage src={''} />}
			<StyledMessageItem $isUser={$isUser}>{message}</StyledMessageItem>
		</StyledMessageBox>
	);
};

export default ChatBox;

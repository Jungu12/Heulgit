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

const ChatBox: React.FC<MessageItemProps> = ({ message, $isUser }) => {
	return (
		<StyledMessageBox $isUser={$isUser}>
			<StyledMessageItem $isUser={$isUser}>{message}</StyledMessageItem>
		</StyledMessageBox>
	);
};

export default ChatBox;
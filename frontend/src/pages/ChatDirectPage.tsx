// Import statements
import Header from '@components/common/Header';
import ChatBox from '@components/profile/ChatBox';
import { colors } from '@constants/colors';
import React, { useState, KeyboardEvent } from 'react';
import { styled } from 'styled-components';

// Define the Message type
type Message = {
	text: string;
	$isUser: boolean;
};

// Define the state for ChatDirectPage component
type ChatDirectPageState = {
	inputMessage: string;
	messages: Message[];
};

// Styled components for the ChatDirectPage component
const StyledHeader = styled.div`
	width: 100%;
	height: 56px;
	margin-bottom: 10px;
`;

const StyledMessage = styled.div`
	word-wrap: break-word;
	word-break: break-all;
	margin-bottom: 50px;
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

// StyledInputDivProps is used to style the input based on whether it is empty or not
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
	margin: 10px 0;
`;

const StyledInput = styled.input`
	outline: none;
	width: 100%;
`;

const StyledButton = styled.button`
	width: 50px;
	height: 30px;
`;

// ChatDirectPage component
const ChatDirectPage: React.FC = () => {
	const [state, setState] = useState<ChatDirectPageState>({
		inputMessage: '',
		messages: [
			{ text: '야야 뭐하고있어', $isUser: false },
			{ text: '누워서 티비보는중~ 넌?', $isUser: true },
			{ text: '나두 그냥 누워있음ㅋㅋ', $isUser: false },
			{
				text: '두줄이상은 어떻게 되는지 확인해야지... 길게길게 써봅시다... 리액트 너무너무 재밌다...즐겁다...',
				$isUser: true,
			},
		],
	});

	// Handle input change in the input field
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setState((prev) => ({ ...prev, inputMessage: e.target.value }));
	};

	// Handle form submission (button click)
	const handleSubmit = () => {
		const { inputMessage, messages } = state;

		if (inputMessage.trim() === '') {
			return;
		}

		setState({
			inputMessage: '',
			messages: [...messages, { text: inputMessage, $isUser: true }],
		});
	};

	const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSubmit();
		}
	};

	// Render the ChatDirectPage component
	return (
		<div>
			<StyledHeader>
				<Header title={'userName'} />
			</StyledHeader>
			<StyledMessage>
				{state.messages.map((message, index) => (
					<ChatBox
						key={index}
						message={message.text}
						$isUser={message.$isUser}
					/>
				))}
			</StyledMessage>
			<StyledFooter>
				<StyledInputWrap>
					<StyledInputDiv $isEmpty={state.inputMessage === ''}>
						<StyledInput
							type="text"
							value={state.inputMessage}
							onChange={handleInputChange}
							onKeyPress={handleKeyPress}
						/>
					</StyledInputDiv>
				</StyledInputWrap>
				<StyledButton onClick={handleSubmit}>전송</StyledButton>
			</StyledFooter>
		</div>
	);
};

export default ChatDirectPage;

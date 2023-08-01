import { colors } from '@constants/colors';
import React, { ChangeEvent, useState } from 'react';
import { styled } from 'styled-components';

// 내용 컨테이너
const StyledContentInputContainer = styled.div`
	display: flex;
	flex-direction: column;

	width: 100%;
`;

// url 컨테이너
const StyledURLInput = styled.textarea.attrs({
	maxLength: 1000,
	placeholder: 'URL 입력은 필수입니다.',
})`
	display: block;
	position: relative;
	overflow: auto;

	height: 50px;
	padding: 0px 15px 15px 15px;
	top: 10px;

	font-size: 17px;
	font-weight: bold;
	word-break: break-word;

	/* textarea 크기 조절 막기 */
	resize: none;

	border: none;
	outline: none;
`;

// 게시물 내용 텍스트 컨테이너
const StyledContentInput = styled.textarea.attrs({
	maxLength: 1000,
	placeholder: '내용은 1000자까지 입력이 가능합니다.',
})`
	display: block;
	position: relative;
	overflow: auto;

	height: calc(100vh - 400px);

	padding: 0px 15px 15px 15px;
	top: 10px;
	/* margin: 0 20px; */
	/* background-color: ${colors.greyScale.grey3}; */

	/* textarea 크기 조절 막기 */
	resize: none;

	font-size: 17px;
	font-weight: bold;

	border: none;
	outline: none;
`;

type ContentInputProps = {
	onChange: (value: string) => void;
	showURLInput?: boolean; // URL 입력 부분을 보여줄지 여부를 props로 받음
};

const ContentInput: React.FC<ContentInputProps> = ({
	onChange,
	showURLInput = true,
}) => {
	const [content, setContent] = useState('');
	const [url, setUrl] = useState('');

	const contentChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const inputValue = e.target.value;
		setContent(inputValue);
		onChange(inputValue);
	};

	const urlChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const inputValue = e.target.value;
		setUrl(inputValue);
		onChange(inputValue);
	};

	return (
		<StyledContentInputContainer>
			{showURLInput && (
				<StyledURLInput onChange={urlChangeHandler} value={url} />
			)}
			<StyledContentInput onChange={contentChangeHandler} value={content} />
		</StyledContentInputContainer>
	);
};

export default ContentInput;

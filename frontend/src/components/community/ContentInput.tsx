import { colors } from '@constants/colors';
import { EurekaWriteType } from '@typedef/community/eureka.types';
import React, { ChangeEvent } from 'react';
import { styled } from 'styled-components';

// 내용 컨테이너
const StyledContentInputContainer = styled.div`
	display: flex;
	flex-direction: column;

	width: 100%;
	flex: 1;
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
	padding: 10px 15px 15px 15px;
	/* top: 10px; */

	font-size: 15px;
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

	padding: 10px 15px 15px 15px;
	/* top: 10px; */
	/* margin: 0 20px; */
	/* background-color: ${colors.greyScale.grey3}; */

	/* height: 300px; */

	/* textarea 크기 조절 막기 */
	resize: none;

	font-size: 15px;
	font-weight: bold;
	line-height: 1.2;

	border: none;
	textarea {
		outline: none;
	}

	flex: 1;
`;

type ContentInputProps = {
	postInput?: EurekaWriteType;
	onChange: (value: string) => void;
	onChangeLink?: (value: string) => void;
	showURLInput?: boolean; // URL 입력 부분을 보여줄지 여부를 props로 받음
};

const ContentInput = ({
	onChange,
	onChangeLink,
	postInput,
	showURLInput = true,
}: ContentInputProps) => {
	const contentChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const inputValue = e.target.value;
		onChange(inputValue);
	};

	const urlChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const inputValue = e.target.value;
		if (onChangeLink) {
			onChangeLink(inputValue);
		}
	};

	return (
		<StyledContentInputContainer>
			{showURLInput && (
				<StyledURLInput onChange={urlChangeHandler} value={postInput?.link} />
			)}
			<StyledContentInput
				onChange={contentChangeHandler}
				value={postInput?.content}
			/>
		</StyledContentInputContainer>
	);
};

export default ContentInput;

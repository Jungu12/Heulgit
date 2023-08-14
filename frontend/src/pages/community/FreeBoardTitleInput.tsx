// import { colors } from '@constants/colors';
import { FreeBoardWriteType } from '@typedef/community/freeboard.types';
import React, { ChangeEvent } from 'react';
import { styled } from 'styled-components';

const StyledTitleContainer = styled.div`
	display: flex;
	align-items: center;

	width: 100%;
`;

const StlyedTitleInput = styled.textarea.attrs({
	maxLength: 30,
	placeholder: '제목은 30자까지 입력이 가능합니다.',
})`
	display: block;
	position: relative;
	overflow: auto;
	overflow-y: hidden;

	width: 100%;
	height: 50px;
	padding: 15px 15px 0 15px;

	font-size: 18px;
	font-weight: bold;

	resize: none;

	border: none;
	outline: none;
`;

type TitleInputProps = {
	postInput?: FreeBoardWriteType;
	onChange: (value: string) => void;
};

const FreeBoardTitleInput: React.FC<TitleInputProps> = ({
	postInput,
	onChange,
}) => {
	// 입력값이 변경될 때마다 onChange 이벤트 핸들러 실행
	const titleChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
		onChange(e.target.value);
	};

	return (
		<StyledTitleContainer>
			<StlyedTitleInput
				value={postInput?.title}
				onChange={titleChangeHandler}
			/>
		</StyledTitleContainer>
	);
};

export default FreeBoardTitleInput;

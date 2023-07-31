import { colors } from '@constants/colors';
import React from 'react';
import { styled } from 'styled-components';

// 댓글 컨테이너
const StyledCommentComtainer = styled.div`
	display: flex;
	position: fixed;
	justify-content: space-evenly;
	align-items: center;

	bottom: 0;
	left: 0;
	right: 0;
	/* z-index: 1; */

	height: 50px;

	border-top: solid 1px ${colors.greyScale.grey3};
	background-color: #fff;
`;

// 프로필 이미지
const StyledProfileImg = styled.img`
	width: 30px;
	height: 30px;

	border-radius: 50%;
	background-color: #000000;
`;

const StyledCommentInputContainer = styled.div`
	display: flex;
	align-items: center;
	position: relative;
	width: 80%;
`;

// 댓글 input창
const StyledCommentInput = styled.input.attrs({
	maxLength: 50,
	placeholder: '댓글은 50자까지 입력이 가능합니다.',
})`
	border: solid 1px ${colors.greyScale.grey3};
	border-radius: 8px;

	padding: 0 40px 0 5px; /* 오른쪽 padding을 버튼 앞까지로 설정 */
	width: 100%;
	height: 30px;

	font-size: 13px;
	font-weight: bold;
	color: ${colors.primary.primatyDark};
	white-space: nowrap;

	&:focus {
		outline: none;
		border: solid 1px ${colors.primary.primatyDark};
	}
`;

const StyledRegisterButton = styled.button`
	position: absolute;
	right: 5px;
	top: 50%;
	transform: translateY(-50%);

	border: none;
	background-color: transparent;

	color: ${colors.greyScale.grey4};
	font-weight: bold;
	font-size: 13px;
`;

const CommentInput = () => {
	return (
		<StyledCommentComtainer>
			<StyledProfileImg />
			<StyledCommentInputContainer>
				<StyledCommentInput />
				<StyledRegisterButton>등록</StyledRegisterButton>
			</StyledCommentInputContainer>
		</StyledCommentComtainer>
	);
};

export default CommentInput;

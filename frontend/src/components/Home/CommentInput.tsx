import { colors } from '@constants/colors';
import { images } from '@constants/images';
import React from 'react';
import { styled } from 'styled-components';

const CommentInputContainer = styled.div`
	position: fixed;
	bottom: 0;
	width: 100%;
	display: flex;
	padding: 10px 16px;
`;

const StyledProfile = styled.img`
	width: 28px;
	height: 28px;
	margin-right: 20px;
`;

const StyledInputContainer = styled.div`
	display: flex;
	position: relative;
	flex: 1;
`;

const StyledInput = styled.input`
	flex: 1;
	font-size: 12px;
	font-weight: 500;
`;

const StyledSubmitButton = styled.button`
	border: none;
	color: ${colors.primary.primary};
	font-size: 12px;
	font-weight: 700;
`;

const CommentInput = () => {
	return (
		<CommentInputContainer>
			<StyledProfile src={images.dummy.dummy1} alt="profile" />
			<StyledInputContainer>
				<StyledInput type="text" />
				<StyledSubmitButton>등록</StyledSubmitButton>
			</StyledInputContainer>
		</CommentInputContainer>
	);
};

export default CommentInput;

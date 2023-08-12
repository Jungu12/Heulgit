import { colors } from '@constants/colors';
import { images } from '@constants/images';
import { RootState } from '@store/index';
import React from 'react';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';

const CommentInputContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const StyledProfile = styled.img`
	width: 28px;
	height: 28px;
	margin-right: 20px;
	border-radius: 50%;
`;

const StyledInputContainer = styled.div`
	display: flex;
	position: relative;
	flex: 1;
`;

const StyledInput = styled.input`
	font-size: 16px;
	font-weight: 500;
	flex: 1;
	outline: none;
	margin-right: 12px;
`;

const StyledSubmitButton = styled.button`
	border: none;
	color: ${colors.primary.primary};
	background-color: white;
	cursor: pointer;
	img {
		width: 24px;
		height: 24px;
	}
`;

type Props = {
	input: string;
	onHandleComment: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onClickSubbmit: () => Promise<void>;
};

const CommentInput = ({ input, onHandleComment, onClickSubbmit }: Props) => {
	const userImage = useSelector(
		(state: RootState) => state.user.user?.avatarUrl,
	);

	return (
		<CommentInputContainer>
			<StyledProfile src={userImage} alt="profile" />
			<StyledInputContainer>
				<StyledInput
					type="text"
					placeholder="댓글을 입력해주세요."
					maxLength={50}
					value={input}
					onChange={onHandleComment}
				/>
				<StyledSubmitButton>
					<img src={images.send} alt="send" onClick={onClickSubbmit} />
				</StyledSubmitButton>
			</StyledInputContainer>
		</CommentInputContainer>
	);
};

export default CommentInput;

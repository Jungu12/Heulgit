import { Mobile, PC, Tablet } from '@components/common/MediaQuery';
import { colors } from '@constants/colors';
import { images } from '@constants/images';
import { RootState } from '@store/index';
import React from 'react';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';

// 댓글 컨테이너 모바일
const StyledCommentComtainerMobile = styled.div`
	display: flex;
	position: fixed;
	justify-content: space-evenly;
	align-items: center;

	bottom: 0;
	left: 0;
	right: 0;
	/* z-index: 1; */

	height: 60px;

	border-top: solid 1px ${colors.greyScale.grey3};
	background-color: #fff;
`;

// 댓글 컨테이너 테블릿 PC
const StyledCommentComtainerTabletPC = styled.div`
	display: flex;
	position: fixed;
	/* justify-content: space-evenly; */
	align-items: center;

	width: 640px;
	/* width: 100vw; */
	bottom: 0;

	height: 60px;

	border-top: solid 1px ${colors.greyScale.grey3};
	background-color: #fff;
`;

// 프로필 이미지
const StyledProfileImg = styled.img`
	width: 32px;
	height: 32px;

	margin: 0 12px;

	border-radius: 50%;
`;

const StyledCommentInputContainer = styled.div`
	display: flex;
	position: relative;
	flex: 1;
`;

// 댓글 input창
const StyledCommentInput = styled.input.attrs({
	maxLength: 50,
	placeholder: '댓글은 50자까지 입력이 가능합니다.',
})`
	flex: 1;
	outline: none;
	margin-right: 12px;

	font-size: 16px;
	font-weight: 500;
`;

// 등록 버튼
const StyledRegisterButton = styled.button`
	border: none;
	color: ${colors.primary.primary};
	background-color: white;
	margin: 0 12px;
	cursor: pointer;
	img {
		width: 24px;
		height: 24px;
	}
`;

type Props = {
	input?: string;
	onSubmitComment?: () => void;
	handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CommentInput = ({ input, onSubmitComment, handleInputChange }: Props) => {
	const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			if (input!.trim() !== '') {
				if (onSubmitComment) onSubmitComment();
			}
		}
	};

	const userImage = useSelector(
		(state: RootState) => state.user.user?.avatarUrl,
	);

	const isKeywordValid = input!.trim().length > 0;

	return (
		<>
			<Mobile>
				<StyledCommentComtainerMobile>
					<StyledProfileImg src={userImage} alt="profile" />
					<StyledCommentInputContainer>
						<StyledCommentInput
							value={input}
							onChange={handleInputChange}
							onKeyDown={handleEnter}
						/>
						<StyledRegisterButton>
							<img src={images.send} alt="send" onClick={onSubmitComment} />
						</StyledRegisterButton>
					</StyledCommentInputContainer>
				</StyledCommentComtainerMobile>
			</Mobile>

			<Tablet>
				<StyledCommentComtainerTabletPC>
					<StyledProfileImg />
					<StyledCommentInputContainer>
						<StyledCommentInput
							value={input}
							onChange={handleInputChange}
							onKeyDown={handleEnter}
						/>
						<StyledRegisterButton onClick={onSubmitComment}>
							등록
						</StyledRegisterButton>
					</StyledCommentInputContainer>
				</StyledCommentComtainerTabletPC>
			</Tablet>

			<PC>
				<StyledCommentComtainerTabletPC>
					<StyledProfileImg />
					<StyledCommentInputContainer>
						<StyledCommentInput
							value={input}
							onChange={handleInputChange}
							onKeyDown={handleEnter}
						/>
						<StyledRegisterButton onClick={onSubmitComment}>
							등록
						</StyledRegisterButton>
					</StyledCommentInputContainer>
				</StyledCommentComtainerTabletPC>
			</PC>
		</>
	);
};

export default CommentInput;

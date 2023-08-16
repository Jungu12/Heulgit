import { colors } from '@constants/colors';
import { images } from '@constants/images';
import { HeulGitCommentType } from '@typedef/home/heulgit.types';
import React from 'react';
import { styled } from 'styled-components';

const StyledComment = styled.div`
	display: flex;
	margin-top: 20px;
`;

const StyledProfile = styled.img`
	width: 32px;
	height: 32px;
	border-radius: 50%;
	margin-left: 12px;
	margin-right: 12px;
`;

const StyledContentBox = styled.div`
	display: flex;
	flex-direction: column;
`;

const StyledUserName = styled.p`
	font-size: 14px;
	font-weight: 500;
	margin-bottom: 6px;
`;

const StyledContent = styled.p`
	font-size: 14px;
	font-weight: 500;
	margin-bottom: 10px;
`;

const StyledReply = styled.p`
	color: ${colors.greyScale.grey4};
	font-size: 14px;
	font-weight: 600;
`;

const StyledOptionContainer = styled.div`
	display: flex;
	margin-left: auto;
	margin-right: 10px;
	gap: 12px;
	color: ${colors.greyScale.grey4};
	font-size: 14px;
	font-weight: 700;

	img {
		width: 16px;
		height: 16px;
	}
`;

type Props = {
	comment: HeulGitCommentType;
	onClickCommentMenuOpen: (commentId: number) => void;
};

const Comment = ({ comment, onClickCommentMenuOpen }: Props) => {
	return (
		<StyledComment>
			<StyledProfile src={comment.user.avatarUrl} alt="profile" />
			<StyledContentBox>
				<StyledUserName>{comment.user.githubId}</StyledUserName>
				<StyledContent>{comment.content}</StyledContent>
				<StyledReply>답글 달기</StyledReply>
			</StyledContentBox>
			<StyledOptionContainer>
				{comment.updatedDate}
				<img
					src={images.menu}
					alt="option"
					onClick={() => onClickCommentMenuOpen(comment.commentId)}
				/>
			</StyledOptionContainer>
		</StyledComment>
	);
};

export default Comment;

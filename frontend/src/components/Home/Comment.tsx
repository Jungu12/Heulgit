import { colors } from '@constants/colors';
import { images } from '@constants/images';
import { RootState } from '@store/index';
import { HeulGitCommentType } from '@typedef/home/heulgit.types';
import { getTimeAgo } from '@utils/date';
import React from 'react';
import { useSelector } from 'react-redux';
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
	onClickDelete?: (commentId: number) => void;
	onClickCommentMenuOpen?: (commentId: number) => void;
	type: 'bottomSheet' | 'detail';
};

const Comment = ({
	comment,
	onClickDelete,
	onClickCommentMenuOpen,
	type,
}: Props) => {
	const user = useSelector((state: RootState) => state.user.user);
	return (
		<StyledComment>
			<StyledProfile src={comment.user.avatarUrl} alt="profile" />
			<StyledContentBox>
				<StyledUserName>{comment.user.githubId}</StyledUserName>
				<StyledContent>{comment.content}</StyledContent>
				<StyledReply>답글 달기</StyledReply>
			</StyledContentBox>
			<StyledOptionContainer>
				{getTimeAgo(comment.updatedDate)}
				{comment.user.githubId === user?.githubId && (
					<img
						src={images.closeBlack}
						alt="delete"
						onClick={() => {
							if (type === 'bottomSheet') onClickDelete!(comment.commentId);
							if (type === 'detail') onClickCommentMenuOpen!(comment.commentId);
						}}
					/>
				)}
			</StyledOptionContainer>
		</StyledComment>
	);
};

export default Comment;

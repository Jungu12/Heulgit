import { colors } from '@constants/colors';
import { images } from '@constants/images';
import { RootState } from '@store/index';
import { EurekaCommentType } from '@typedef/community/eureka.types';
import { getTimeAgo } from '@utils/date';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
	font-weight: 700;
	margin-bottom: 10px;
`;

const StyledContent = styled.p`
	font-size: 14px;
	font-weight: 500;
`;

// const StyledReply = styled.p`
// 	color: ${colors.greyScale.grey4};
// 	font-size: 14px;
// 	font-weight: 600;
// `;

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
	comment: EurekaCommentType;
	onClickDelete: (commentId: number) => void;
};

const EurekaComment = ({ comment, onClickDelete }: Props) => {
	const navigation = useNavigate();
	const user = useSelector((state: RootState) => state.user.user);

	const goUserProfile = useCallback(() => {
		navigation(`/profiles/${comment.user.githubId}`);
	}, [comment.user.githubId]);

	return (
		<StyledComment>
			<StyledProfile
				onClick={goUserProfile}
				src={comment.user.avatarUrl}
				alt="profile"
			/>
			<StyledContentBox>
				<StyledUserName onClick={goUserProfile}>
					{comment.user.githubId}
				</StyledUserName>
				<StyledContent>{comment.content}</StyledContent>
				{/* <StyledReply>답글 달기</StyledReply> */}
			</StyledContentBox>
			<StyledOptionContainer>
				{getTimeAgo(comment.updatedDate)}
				{user?.githubId === comment.user.githubId && (
					<img
						src={images.closeBlack}
						alt="option"
						onClick={() => onClickDelete(comment.commentId)}
					/>
				)}
			</StyledOptionContainer>
		</StyledComment>
	);
};

export default EurekaComment;

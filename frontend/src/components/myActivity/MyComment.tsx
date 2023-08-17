import { colors } from '@constants/colors';
import { RootState } from '@store/index';
import { UserCommentType } from '@typedef/profile/user.types';
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
	font-weight: 700;
	margin-bottom: 10px;
`;

const StyledContent = styled.p`
	font-size: 14px;
	font-weight: 500;
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
	comment: UserCommentType;
};

const MyComment = ({ comment }: Props) => {
	const user = useSelector((state: RootState) => state.user.user);

	return (
		<StyledComment>
			<StyledProfile src={user?.avatarUrl} alt="profile" />
			<StyledContentBox>
				<StyledUserName>{comment.githubId}</StyledUserName>
				<StyledContent>{comment.content}</StyledContent>
			</StyledContentBox>
			<StyledOptionContainer>
				{getTimeAgo(comment.updatedDate)}
			</StyledOptionContainer>
		</StyledComment>
	);
};

export default MyComment;

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
	font-weight: 400;
	margin-bottom: 10px;
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
};

const MyComment = ({ comment }: Props) => {
	return (
		<StyledComment>
			<StyledProfile src={comment.user.avater_url} alt="profile" />
			<StyledContentBox>
				<StyledUserName>{comment.user.id}</StyledUserName>
				<StyledContent>{comment.content}</StyledContent>
			</StyledContentBox>
			<StyledOptionContainer>
				{comment.updated_date}
				<img src={images.menu} alt="option" />
			</StyledOptionContainer>
		</StyledComment>
	);
};

export default MyComment;

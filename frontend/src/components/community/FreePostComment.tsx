import { colors } from '@constants/colors';
import { images } from '@constants/images';
import { FreeBoardCommentType } from '@typedef/community/freeboard.types';
import React from 'react';
import { styled } from 'styled-components';

// 댓글 컨테이너
const StyledComment = styled.div`
	display: flex;
	margin-top: 20px;
`;

// 프로필 담는 컨테이너
const StyledProfileContainer = styled.div`
	display: flex;
	flex-direction: row;
`;

// 프로필 이미지
const StyledProfile = styled.img`
	display: flex;
	width: 32px;
	height: 32px;
	border-radius: 50%;
	margin-left: 12px;
	margin-right: 12px;
`;

// 유저 ID
const StyledUserName = styled.p`
	font-size: 15px;
	font-weight: 700;

	margin-bottom: 8px;
`;

// 댓글 내용
const StyledContentBox = styled.div`
	display: flex;
	flex-direction: column;
`;

// 댓글 내용 p 태그
const StyledContent = styled.p`
	font-size: 14px;
	font-weight: 400;

	margin-bottom: 10px;
	margin-right: 10px;

	line-height: 1.1;
`;

// 답글 달기 p 태그
const StyledReply = styled.p`
	color: ${colors.greyScale.grey4};

	font-size: 14px;
	font-weight: 600;
`;

// 몇 분 전
const StyledTime = styled.div`
	display: flex;
	width: 50px;
	font-size: 13px;
`;

// 옵션 선택 이미지 디브
const StyledOptionContainer = styled.div`
	display: flex;
	margin-left: auto;
	margin-right: 10px;
	gap: 5px;
	color: ${colors.greyScale.grey4};
	font-size: 14px;
	font-weight: 700;

	img {
		width: 16px;
		height: 16px;
	}
`;

type Props = {
	comment: FreeBoardCommentType;
};

const FreePostComment = ({ comment }: Props) => {
	return (
		<StyledComment>
			<StyledProfileContainer>
				<StyledProfile src={comment.user.avater_url} alt="profile" />
				<StyledContentBox>
					<StyledUserName>{comment.user.id}</StyledUserName>
					<StyledContent>{comment.content}</StyledContent>
					<StyledReply>답글 달기</StyledReply>
				</StyledContentBox>
			</StyledProfileContainer>
			<StyledOptionContainer>
				<StyledTime> {comment.updated_date}</StyledTime>
				<img src={images.menu} alt="option" />
			</StyledOptionContainer>
		</StyledComment>
	);
};

export default FreePostComment;

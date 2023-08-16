import { colors } from '@constants/colors';
import { images } from '@constants/images';
import { FreeBoardCommentType } from '@typedef/community/freeboard.types';
import { getTimeAgo } from '@utils/date';
// import { FreeBoardCommentType } from '@typedef/community/freeboard.types';
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
	font-weight: 500;

	margin-bottom: 10px;
	margin-right: 10px;

	line-height: 1.1;
`;

// 답글 달기 p 태그
// const StyledReply = styled.p`
// 	color: ${colors.greyScale.grey4};

// 	font-size: 14px;
// 	font-weight: 600;
// `;

// 몇 분 전

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
	onClickCommentMenuOpen: (id: number) => void;
};

const FreePostComment = ({ comment, onClickCommentMenuOpen }: Props) => {
	return (
		<StyledComment>
			<StyledProfileContainer>
				<StyledProfile src={comment.user.avatarUrl} alt="profile" />
				<StyledContentBox>
					<StyledUserName>{comment.user.githubId}</StyledUserName>
					<StyledContent>{comment.content}</StyledContent>
					{/* <StyledReply>답글 달기</StyledReply> */}
				</StyledContentBox>
			</StyledProfileContainer>
			<StyledOptionContainer>
				{getTimeAgo(comment.updatedDate)}
				<img
					src={images.menu}
					alt="option"
					onClick={() => onClickCommentMenuOpen(comment.commentId)}
				/>
			</StyledOptionContainer>
		</StyledComment>
	);
};

export default FreePostComment;

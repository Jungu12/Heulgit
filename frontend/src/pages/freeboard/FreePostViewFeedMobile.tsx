// 자유게시판 게시물 상세페이지 모바일 버전

import { colors } from '@constants/colors';
import { images } from '@constants/images';
import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import { FreeBoardPostResponseType } from '@typedef/community/freeboard.types';
import { formatDateFromString } from '@utils/date';
import ImageSlider from '@components/Home/ImageSlider';
import ReactModal from 'react-modal';

const customStyles = {
	overlay: {
		backgroundColor: 'rgba(0, 0, 0, 0.3)', // 오버레이 배경색을 투명하게 설정
		zIndex: '100',
	},
	content: {
		top: 'auto',
		left: '50%',
		width: '100%',
		right: 'auto',
		bottom: '-70px',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		zIndex: '100',
		display: 'flex',
		border: 'none',
		background: 'none',
		padding: '0 12px',
	},
};

// 피드 전체 컨테이너
const StyledFeedItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 56px;
	width: 100%;
`;

// 탑라인
const StyledTopLine = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

// 프로필 담는 컨테이너
const StyledProfileContainer = styled.div`
	display: flex;
	align-items: center;
	font-size: 12px;
	font-weight: 700;
	gap: 4px;
	margin-left: 12px;
	margin-bottom: 20px;
`;

// 프로필 이미지
const StyledProfileImage = styled.img`
	display: flex;
	width: 36px;
	height: 36px;
	border-radius: 50%;
`;

// pTag Div
const StyledP = styled.div`
	display: flex;
	flex-direction: column;
`;

// 유저 id p 태그
const StyledUserId = styled.p`
	font-size: 15px;
	font-weight: 600;

	margin-left: 5px;
`;

// 업데이트 시간 p 태그
const StyledUpdateTime = styled.p`
	color: ${colors.greyScale.grey4};
	font-size: 12px;
	font-weight: 400;

	margin-left: 5px;
	margin-top: 6px;
`;

// 제목 컨테이너
const StyledTitleContainer = styled.div`
	display: flex;
	margin: 20px 12px 20px 12px;
	align-items: center;
	line-height: 1.3;

	font-size: 20px;
	font-weight: 600;

	img {
		width: 18px;
		height: 18px;
		margin-left: auto;
	}
`;

// 내용 컨테이너
const StyledContentContainer = styled.div`
	display: flex;
	position: relative;
	justify-content: start;

	width: 100%;

	border-top: solid 1px ${colors.greyScale.grey3};
`;

// 내용
const StyledContent = styled.div`
	display: flex;
	position: relative;

	font-size: 14px;

	line-height: 1.3;
	margin: 24px 12px;
`;

// 이미지 담는 컨테이너
// const StyledImgContainer = styled.div`
// 	display: flex;
// 	position: relative;
// 	justify-content: start;
// 	align-items: center;

// 	max-width: 100%;
// 	/* height: 190px; */

// 	margin: 0px 12px 12px 12px;
// 	background-color: #495c83;
// `;

// // 이미지
// const StyledImg = styled.img`
// 	max-width: 100%;
// 	/* height: 190px; */

// 	background-color: aquamarine;
// `;

// 버튼 담는 컨테이너
const StyledButtonContainer = styled.div`
	display: flex;
	margin: 0px 12px 0 12px;
	gap: 12px;

	img {
		height: 24px;
		width: 24px;
	}
`;

// 좋아요, 댓글 수 담는 컨테이너
const StyledSubDataContainer = styled.div`
	display: flex;
	align-items: center;
	color: ${colors.greyScale.grey4};
	font-size: 12px;
	font-weight: 400;
	margin: 8px 12px 12px 12px;
`;

const StyledMenuContainer = styled.div`
	margin-top: auto;
	/* padding: 12px 20px; */
	width: 100%;
	background-color: white;
	border-radius: 16px;
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const StyledMenuItem = styled.div`
	height: 60px;
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: center;
	font-weight: 400;
	font-size: 18px;
	cursor: pointer;
`;

const StyledImageSliderContainer = styled.div`
	margin-bottom: 24px;
	padding: 0 12px;
	/* display: flex;
	justify-content: center; */

	img {
		display: flex;
		max-width: 100%;
		margin: 0 auto;
		justify-content: center;
	}
`;

const StyledUnderline = styled.div`
	width: 100%;
	border: 1px solid ${colors.greyScale.grey3};

	/* margin-bottom: 12px; */
`;

type Props = {
	feed: FreeBoardPostResponseType | null;
	userId: string;
	isMenuOpen: boolean;
	liked: boolean;
	likeNum: number;
	onClickMenu: () => void;
	onClickMenuClose: () => void;
	onClickEdit: () => void;
	onClickDelete: () => void;
	handleLikeClick: () => void;
	onClickLike: () => void;
	onClickUserProfile: () => void;
};

const FreePostViewFeedMobile = ({
	feed,
	userId,
	isMenuOpen,
	liked,
	likeNum,
	onClickLike,
	onClickUserProfile,
	handleLikeClick,
	onClickMenu,
	onClickEdit,
	onClickDelete,
	onClickMenuClose,
}: Props) => {
	if (!feed) {
		return <div>loading...</div>;
	}

	useEffect(() => {
		console.log(feed);
	}, [feed]);

	return (
		<StyledFeedItemContainer>
			{/* 제목 */}
			<StyledTitleContainer>
				<div>{feed.title}</div>
				{userId === feed.user.githubId && (
					<img src={images.menu} onClick={onClickMenu} />
				)}
			</StyledTitleContainer>
			<StyledTopLine>
				{/* 프로필 */}
				<StyledProfileContainer onClick={onClickUserProfile}>
					<StyledProfileImage src={feed.user.avatarUrl} alt="user_profile" />
					<StyledP>
						<StyledUserId>{feed.user.githubId}</StyledUserId>
						<StyledUpdateTime>
							{formatDateFromString(feed.updatedDate)} · 조회 수 {feed.view}회
						</StyledUpdateTime>
					</StyledP>
				</StyledProfileContainer>
			</StyledTopLine>
			{/* 내용 */}
			<StyledContentContainer>
				<StyledContent>{feed.content}</StyledContent>
			</StyledContentContainer>
			{feed.freeBoardImages && (
				<StyledImageSliderContainer>
					<ImageSlider
						images={feed.freeBoardImages.map((img) => img.fileUri)}
					/>
				</StyledImageSliderContainer>
			)}
			{/* 버튼 */}
			<StyledButtonContainer>
				<img
					src={
						liked
							? images.community.likesActive
							: images.community.likesInactive
					}
					alt="likesActive"
					onClick={handleLikeClick} // 좋아요 아이콘 클릭 이벤트 처리
				/>
				<img src={images.share} alt="share_button" />
			</StyledButtonContainer>

			<StyledSubDataContainer>
				<div onClick={onClickLike}>{`좋아요 ${likeNum}개 · `}</div>
				<div>{`댓글 ${feed.freeBoardComments.length}개`}</div>
			</StyledSubDataContainer>
			<StyledUnderline />
			{/* 삭제 수정 취소 */}
			<ReactModal
				isOpen={isMenuOpen}
				style={customStyles}
				// overlayClassName="custom-overlay"
				onRequestClose={onClickMenuClose}
			>
				<StyledMenuContainer>
					<StyledMenuItem style={{ color: 'blue' }} onClick={onClickEdit}>
						수정
					</StyledMenuItem>
					<StyledUnderline />
					<StyledMenuItem style={{ color: 'red' }} onClick={onClickDelete}>
						삭제
					</StyledMenuItem>
					<StyledUnderline />
					<StyledMenuItem onClick={onClickMenuClose}>닫기</StyledMenuItem>
				</StyledMenuContainer>
			</ReactModal>
		</StyledFeedItemContainer>
	);
};

export default FreePostViewFeedMobile;

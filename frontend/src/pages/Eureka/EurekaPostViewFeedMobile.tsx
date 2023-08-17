// 유레카 게시물 상세페이지 모바일 버전

import { colors } from '@constants/colors';
import { images } from '@constants/images';
import React from 'react';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { EurekaPostResponseType } from '@typedef/community/eureka.types';
import ReactModal from 'react-modal';
import { formatDateFromString } from '@utils/date';
import ImageSlider from '@components/Home/ImageSlider';
import Loading from '@components/common/Loading';
import MarkdownRenderer from '@components/Home/MarkdownRenderer';
import { getColorFromName } from '@utils/eureka';

type LabelProps = {
	$color: string;
};

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

// 링크 컨테이너
const StyledLink = styled(Link)`
	margin-left: auto;
`;

const StyledLinkImg = styled.img`
	width: 99px !important;
	height: 28px !important;
`;

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

const StyledLikedSiteContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 12px;
	margin-bottom: 24px;
`;

const StyledLikedSiteTitle = styled.div`
	font-size: 28px;
	font-weight: 700;
	margin-bottom: 12px;
`;

const StyledLabelContainer = styled.div`
	display: flex;
	margin: 12px 0;
`;

const StyledLabel = styled.span<LabelProps>`
	display: flex;
	border-radius: 2em;
	background-color: ${(props) => props.$color};
	color: white;
	margin-right: 8px;
	padding: 6px 12px;
`;

// 구분 선
const StyledUnderline = styled.div`
	width: 100%;
	border: 1px solid ${colors.greyScale.grey3};

	/* margin-bottom: 12px; */
`;

type Props = {
	feed: EurekaPostResponseType | null;
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

const EurekaPostViewFeedMobile = ({
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
		return <Loading />;
	}

	return (
		<StyledFeedItemContainer>
			<StyledTitleContainer>
				<div>{feed.title}</div>
				{userId === feed.user.githubId && (
					<img src={images.menu} onClick={onClickMenu} />
				)}
			</StyledTitleContainer>
			<StyledTopLine>
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
			<StyledContentContainer>
				<StyledContent>{feed.content}</StyledContent>
			</StyledContentContainer>
			{feed.eurekaImages && (
				<StyledImageSliderContainer>
					<ImageSlider images={feed.eurekaImages.map((img) => img.fileUri)} />
				</StyledImageSliderContainer>
			)}
			{/* 유레카 링크된 사이트 보여주기 */}
			<StyledLikedSiteContainer>
				<StyledLikedSiteTitle>
					{feed.eurekaGithubInfo.title}
				</StyledLikedSiteTitle>
				{feed.eurekaLabels.length && (
					<StyledLabelContainer>
						{feed.eurekaLabels.map((label) => (
							<StyledLabel $color={getColorFromName(label.name)}>
								{label.name}
							</StyledLabel>
						))}
					</StyledLabelContainer>
				)}
				<MarkdownRenderer type="text" text={feed.eurekaGithubInfo.body} />
			</StyledLikedSiteContainer>
			<StyledButtonContainer>
				<img
					src={
						liked
							? images.community.likesActive
							: images.community.likesInactive
					}
					alt="likesActive"
					onClick={handleLikeClick}
				/>
				<img src={images.share} alt="share_button" />
				<StyledLink to={feed.link} target="_blank">
					<StyledLinkImg src={images.gotoGit} />
				</StyledLink>
			</StyledButtonContainer>
			<StyledSubDataContainer>
				<div onClick={onClickLike}>{`좋아요 ${likeNum}개 · `}</div>
				<div>{`댓글 ${feed.eurekaComments.length}개`}</div>
			</StyledSubDataContainer>
			<StyledUnderline />
			<ReactModal
				isOpen={isMenuOpen}
				style={customStyles}
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

export default EurekaPostViewFeedMobile;

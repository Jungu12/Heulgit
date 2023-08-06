import { colors } from '@constants/colors';
import { images } from '@constants/images';
import React, { useCallback, useState } from 'react';
import { styled } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { EurekaPostType } from '@typedef/community/eureka.types';

// 피드 컨테이너
const StyledFeedItemContainer = styled.div`
	display: flex;
	flex-direction: column;

	margin-top: 35px;
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
	display: block;
	margin: 20px 12px 20px 12px;

	line-height: 1.3;

	font-size: 20px;
	font-weight: 600;
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
	margin: 12px;
`;

// 이미지 담는 컨테이너
const StyledImgContainer = styled.div`
	display: flex;
	position: relative;
	justify-content: start;
	align-items: center;

	max-width: 100%;
	/* height: 190px; */

	margin: 0px 12px 12px 12px;
`;

// 이미지
const StyledImg = styled.img`
	max-width: 100%;
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

// 구분 선
const StyledUnderline = styled.div`
	width: 100%;
	border: 1px solid ${colors.greyScale.grey3};

	/* margin-bottom: 12px; */
`;

// 왼쪽 메뉴바
// const StyledMenuContainer = styled.div`
// 	display: flex;

// 	width: 124px;
// 	height: 100%;

// 	background-color: #432434;
// `;

type Props = {
	feed: EurekaPostType;
};

const EurekaPostViewFeedTablet = ({ feed }: Props) => {
	const navigation = useNavigate();

	// 좋아요 버튼 state
	const [liked, setLiked] = useState(false);

	// 좋아요 버튼 클릭시 이미지 변환
	const handleLikeClick = () => {
		setLiked((prevLiked) => !prevLiked);
	};

	// 이미지 있는 경우에만 컨테이너 보여주기
	const imageSrc = feed.images.length > 0 ? feed.images[0].file_uri : '';

	// 좋아요 누른 사람 목록 보기
	const onClickLike = useCallback(() => {
		navigation('like');
	}, [navigation, feed.id]);

	const onClickUserProfile = useCallback(() => {
		navigation(`/profiles/${feed.user.id}`);
	}, []);

	return (
		<StyledFeedItemContainer>
			<StyledTitleContainer>{feed.title}</StyledTitleContainer>
			<StyledTopLine>
				<StyledProfileContainer onClick={onClickUserProfile}>
					<StyledProfileImage src={feed.user.avater_url} alt="user_profile" />
					<StyledP>
						<StyledUserId>{feed.user.id}</StyledUserId>
						<StyledUpdateTime>
							{feed.updated_date} · 조회 수 {feed.views}회
						</StyledUpdateTime>
					</StyledP>
				</StyledProfileContainer>
			</StyledTopLine>
			<StyledContentContainer>
				<StyledContent>{feed.content}</StyledContent>
			</StyledContentContainer>
			{imageSrc && (
				<StyledImgContainer>
					<StyledImg src={imageSrc} />
				</StyledImgContainer>
			)}

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
				<StyledLink to={feed.link}>
					<StyledLinkImg src={images.gotoGit} />
				</StyledLink>
			</StyledButtonContainer>
			<StyledSubDataContainer>
				<div onClick={onClickLike}>{`좋아요 ${feed.likes}개 · `}</div>
				<div>{`댓글 ${feed.comments}개`}</div>
			</StyledSubDataContainer>
			<StyledUnderline />
		</StyledFeedItemContainer>
	);
};

export default EurekaPostViewFeedTablet;

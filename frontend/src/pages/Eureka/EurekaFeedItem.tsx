// 유레카 단일 피드

import { colors } from '@constants/colors';
import { images } from '@constants/images';
import React, { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { EurekaPostType } from '@typedef/community/eureka.types';
import { getTimeAgo } from '@utils/date';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { authHttp } from '@utils/http';
import ImageSlider from '@components/Home/ImageSlider';

const StyledFeedItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 16px;
`;

const StyledTopLine = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const StyledProfileContainer = styled.div`
	display: flex;
	align-items: center;
	font-size: 12px;
	font-weight: 700;
	gap: 4px;
	margin-left: 12px;
`;

const StyledProfileImage = styled.img`
	width: 36px;
	height: 36px;
	border-radius: 50%;
`;

const StyledUpdateTime = styled.p`
	color: ${colors.greyScale.grey4};
	font-size: 12px;
	font-weight: 400;
	margin-right: 12px;
`;

// 제목 + 내용 컨테이너
const StyledFeedContentContainer = styled.div``;

// 제목 컨테이너
const StyledTitleContainer = styled.div`
	display: block;
	margin: 30px 12px 0px 12px;

	font-size: 20px;
	font-weight: 600;

	max-width: 95vw;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

// 내용 컨테이너
const StyledContentContainer = styled.div`
	display: block;
	/* flex-direction: column; */
	margin: 20px 12px 0px 12px;

	font-size: 18px;

	max-width: 95vw;
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 3; /* 세 줄까지 표시 */
	-webkit-box-orient: vertical;
`;

// 이미지 담는 컨테이너
// const StyledImgContainer = styled.div`
// 	display: flex;
// 	position: relative;
// 	justify-content: start;
// 	align-items: center;

// 	max-width: 100%;
// 	/* height: 190px; */

// 	margin: 20px 12px 0 12px;
// `;

// 이미지
// const StyledImg = styled.img`
// 	max-width: 100%;
// `;

const StyledButtonContainer = styled.div`
	display: flex;
	margin: 24px 12px 0px 12px;
	gap: 16px;

	img {
		height: 24px;
		width: 24px;
		cursor: pointer;
	}
`;

const StyledSubDataContainer = styled.div`
	display: flex;
	align-items: center;
	color: ${colors.greyScale.grey4};
	font-size: 12px;
	font-weight: 400;
	margin: 8px 12px 0 12px;

	div {
		cursor: pointer;
	}
`;

const StyledImageSliderContainer = styled.div`
	margin: 24px 0px 12px 0px;
	padding: 0 12px;

	img {
		display: flex;
		max-width: 100%;
		margin: 0 auto;
	}
`;

type Props = {
	feed: EurekaPostType;
	onClickComment: (id: number) => void;
};

const EurekaFeedItem = ({ feed, onClickComment }: Props) => {
	const navigation = useNavigate();
	const githubId = useSelector((state: RootState) => state.user.user?.githubId);

	// 좋아요 이미지 변환
	const [liked, setLiked] = useState(false);
	const [likeNum, setLikeNum] = useState(feed.likedUsers.length);
	const imgUrl = feed.eurekaImages;

	// 좋아요 클릭시 변환 이벤트
	const handleLikeClick = () => {
		if (liked) {
			authHttp
				.get(`eureka/posts/unlike/${feed.eurekaId}?userId=${githubId}`)
				.then(() => {
					setLiked((prev) => !prev);
					setLikeNum((prev) => prev - 1);
				});
		} else {
			authHttp
				.get(`eureka/posts/like/${feed.eurekaId}?userId=${githubId}`)
				.then(() => {
					setLiked((prev) => !prev);
					setLikeNum((prev) => prev + 1);
				});
		}
	};

	// 좋아요 누른 유저 목록 페이지로 이동
	const onClickLike = useCallback(() => {
		navigation(`${1}/like`);
	}, []);

	// 유레카 피드 상세보기 페이지로 이동
	const onClickFeedItem = useCallback(() => {
		navigation(`${feed.eurekaId}`);
	}, [feed]);

	// 유저 프로필 클릭시 유저 마이페이지로 이동
	const onClickUserProfile = useCallback(() => {
		navigation(`/profiles/${feed.user.githubId}`);
	}, []);

	useEffect(() => {
		console.log(feed);
	}, [feed]);

	useEffect(() => {
		const found = feed.likedUsers.find((user) => user.githubId === githubId);
		if (found) {
			setLiked(true);
		} else {
			setLiked(false);
		}
		setLikeNum(feed.likedUsers.length);
	}, [feed]);

	return (
		<StyledFeedItemContainer>
			<StyledTopLine>
				{/* 프로필 */}
				<StyledProfileContainer onClick={onClickUserProfile}>
					<StyledProfileImage src={feed.user.avatarUrl} alt="user_profile" />
					<p>{feed.user.githubId}</p>
				</StyledProfileContainer>
				<StyledUpdateTime>{getTimeAgo(feed.updatedDate)}</StyledUpdateTime>
			</StyledTopLine>
			{/* 피드 */}
			<StyledFeedContentContainer onClick={onClickFeedItem}>
				<StyledTitleContainer>{feed.title}</StyledTitleContainer>
				<StyledContentContainer>{feed.content}</StyledContentContainer>

				{imgUrl && (
					<StyledImageSliderContainer>
						<ImageSlider images={imgUrl.map((url) => url.fileUri)} />
					</StyledImageSliderContainer>
				)}
			</StyledFeedContentContainer>
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
				<img src={images.chat} alt="comment_button" />
			</StyledButtonContainer>
			{/* 좋아요 및 댓글 */}
			<StyledSubDataContainer>
				<div onClick={onClickLike}>{`좋아요 ${likeNum}개 · `}</div>
				<div
					onClick={() => onClickComment(feed.eurekaId)}
				>{`댓글 ${feed.eurekaComments.length}개`}</div>
			</StyledSubDataContainer>
		</StyledFeedItemContainer>
	);
};

export default EurekaFeedItem;

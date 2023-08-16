// 자유게시판 단일 피드

import { colors } from '@constants/colors';
import { images } from '@constants/images';
import React, { useCallback, useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FreeBoardPostType } from '@typedef/community/freeboard.types';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import ImageSlider from '@components/Home/ImageSlider';
import { authHttp } from '@utils/http';
import { getTimeAgo } from '@utils/date';

// 피드 전체 컨테이너
const StyledFeedItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 16px;
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
`;

// 프로필 이미지
const StyledProfileImage = styled.img`
	width: 36px;
	height: 36px;
	border-radius: 50%;
`;

// 업데이트 시간 p 태그
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

// 버튼 담는 컨테이너
const StyledButtonContainer = styled.div`
	display: flex;
	margin: 24px 12px 0 12px;
	gap: 16px;

	img {
		height: 24px;
		width: 24px;
		cursor: pointer;
	}
`;

// 좋아요, 댓글 수 담는 컨테이너
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
	feed: FreeBoardPostType;
	onClickComment: (id: number) => void;
};

const FreeBoardFeedItem = ({ feed, onClickComment }: Props) => {
	const navigation = useNavigate();
	const githubId = useSelector((state: RootState) => state.user.user?.githubId);

	const [liked, setLiked] = useState(false);
	const [likeNum, setLikeNum] = useState(feed.likedUsers.length);
	const imgUrl = feed.freeBoardImages;

	// 좋아요 클릭시 변환 이벤트
	const handleLikeClick = () => {
		if (liked) {
			authHttp
				.get(`freeboard/posts/unlike/${feed.freeBoardId}?userId=${githubId}`)
				.then(() => {
					setLiked((prev) => !prev);
					setLikeNum((prev) => prev - 1);
				});
		} else {
			authHttp
				.get(`freeboard/posts/like/${feed.freeBoardId}?userId=${githubId}`)
				.then(() => {
					setLiked((prev) => !prev);
					setLikeNum((prev) => prev + 1);
				});
		}
	};

	// 좋아요 누른 유저 목록 페이지로 이동
	const onClickLike = useCallback(() => {
		navigation(`free/${feed.freeBoardId}/like`);
	}, [navigation]);

	// 유레카 피드 상세보기 페이지로 이동
	const onClickFeedItem = useCallback(() => {
		navigation(`${feed.freeBoardId}`);
	}, []);

	// 유저 프로필 클릭시 유저 마이페이지로 이동
	const onClickUserProfile = useCallback(() => {
		navigation(`/profiles/${1}`);
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
				{/* 시간 수정하기 */}
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
					onClick={() => onClickComment(feed.freeBoardId)}
				>{`댓글 ${feed.freeBoardComments.length}개`}</div>
			</StyledSubDataContainer>
		</StyledFeedItemContainer>
	);
};

export default FreeBoardFeedItem;

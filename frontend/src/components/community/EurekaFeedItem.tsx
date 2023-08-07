import { colors } from '@constants/colors';
import { images } from '@constants/images';
import React, { useCallback, useState } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { EurekaPostType } from '@typedef/community/eureka.types';

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
const StyledImgContainer = styled.div`
	display: flex;
	position: relative;
	justify-content: start;
	align-items: center;

	max-width: 100%;
	/* height: 190px; */

	margin: 20px 12px 0 12px;
`;

// 이미지
const StyledImg = styled.img`
	max-width: 100%;
`;

const StyledButtonContainer = styled.div`
	display: flex;
	margin: 24px 12px 0px 12px;
	gap: 16px;

	img {
		height: 24px;
		width: 24px;
	}
`;

const StyledSubDataContainer = styled.div`
	display: flex;
	align-items: center;
	color: ${colors.greyScale.grey4};
	font-size: 12px;
	font-weight: 400;
	margin: 8px 12px 0 12px;
`;

type Props = {
	feed: EurekaPostType;
};

const EurekaFeedItem = ({ feed }: Props) => {
	const navigation = useNavigate();

	// 이미지 있는 경우에만 컨테이너 보여주기
	const imageSrc = feed.images.length > 0 ? feed.images[0].file_uri : '';

	// 좋아요 이미지 변환
	const [liked, setLiked] = useState(false);

	// 좋아요 클릭시 변환 이벤트
	const handleLikeClick = () => {
		setLiked((prevLiked) => !prevLiked);
	};

	// 댓글 모달 나오게 할 거
	const onClickComment = useCallback(() => {
		console.log('댓글 클릭');
	}, []);

	// 좋아요 누른 유저 목록 페이지로 이동
	const onClickLike = useCallback(() => {
		navigation(`${feed.id}/like`);
	}, []);

	// 유레카 피드 상세보기 페이지로 이동
	const onClickFeedItem = useCallback(() => {
		navigation(`${feed.id}`);
	}, []);

	// 유저 프로필 클릭시 유저 마이페이지로 이동
	const onClickUserProfile = useCallback(() => {
		navigation(`/profiles/${feed.user.id}`);
	}, []);

	return (
		<StyledFeedItemContainer>
			<StyledTopLine>
				{/* 프로필 */}
				<StyledProfileContainer onClick={onClickUserProfile}>
					<StyledProfileImage src={feed.user.avater_url} alt="user_profile" />
					<p>{feed.user.id}</p>
				</StyledProfileContainer>
				<StyledUpdateTime>{feed.updated_date}</StyledUpdateTime>
			</StyledTopLine>
			{/* 피드 */}
			<StyledFeedContentContainer onClick={onClickFeedItem}>
				<StyledTitleContainer>{feed.title}</StyledTitleContainer>
				<StyledContentContainer>{feed.content}</StyledContentContainer>
				{imageSrc && (
					<StyledImgContainer>
						<StyledImg src={imageSrc} />
					</StyledImgContainer>
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
				<img src={images.share} alt="share_button" />
			</StyledButtonContainer>
			{/* 좋아요 및 댓글 */}
			<StyledSubDataContainer>
				<div onClick={onClickLike}>{`좋아요 ${feed.likes}개 · `}</div>
				<div onClick={onClickComment}>{`댓글 ${feed.comments}개`}</div>
			</StyledSubDataContainer>
		</StyledFeedItemContainer>
	);
};

export default EurekaFeedItem;

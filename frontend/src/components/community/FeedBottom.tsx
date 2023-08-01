import { colors } from '@constants/colors';
import { images } from '@constants/images';
import React, { useState } from 'react';
import { styled } from 'styled-components';

// 컨테이너
const StyledFeedBottomContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 70px;
	margin-top: 15px;
	margin-bottom: 10px;

	/* 아이콘들에 대한 스타일링 */
	img {
		width: 24px;
		height: 24px;
		margin-left: 20px;
	}
`;

// 아이콘 컨테이너
const StyledIconContainer = styled.div`
	height: 30px;
`;

// 댓글 아이콘
const StyledCommentIcon = styled.img`
	width: 24px;
	height: 24px;
	margin-left: 20px;
`;

// 공유 아이콘
const StyledShareIcon = styled.img`
	width: 24px;
	height: 24px;
	margin-left: 20px;
`;

// 카운트
const StyledCount = styled.div`
	height: 20px;
	margin-top: 8px;
	margin-left: 20px;

	font-size: 12px;
	color: ${colors.greyScale.grey4};
`;

const FeedBottom = ({ showCommentIcon = true }) => {
	const [liked, setLiked] = useState(false); // 좋아요 상태를 저장하는 상태 변수 (기본값: false)
	// const [shared, setShared] = useState('');

	// 좋아요 아이콘이 클릭되면 상태를 반전시킵니다.
	const handleLikeClick = () => {
		setLiked((prevLiked) => !prevLiked);
	};

	// 공유 아이콘이 클릭되면 처리할 함수를 추가합니다.
	// const handleShareClick = () => {
	// 	// 공유 기능 구현
	// };

	return (
		<StyledFeedBottomContainer>
			<StyledIconContainer>
				<img
					src={
						liked
							? images.community.likesActive
							: images.community.likesInactive
					}
					alt="likesActive"
					onClick={handleLikeClick} // 좋아요 아이콘 클릭 이벤트 처리
				/>
				{showCommentIcon ? (
					<StyledCommentIcon
						src={images.community.commentButton}
						alt="comment"
						onClick={() => console.log('댓글 아이콘 클릭')} // 댓글 아이콘 클릭 이벤트 처리
					/>
				) : null}
				<StyledShareIcon
					src={images.community.shareButton}
					alt="share"
					onClick={() => console.log('공유 아이콘 클릭')} // 공유 아이콘 클릭 이벤트 처리
				/>
			</StyledIconContainer>
			<StyledCount>좋아요 777개 · 댓글 7개</StyledCount>
		</StyledFeedBottomContainer>
	);
};

export default FeedBottom;

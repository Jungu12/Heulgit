import { colors } from '@constants/colors';
import { images } from '@constants/images';
import React, { useCallback } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
// import MarkdownSummaryRenderer from './MarkdownSummaryRenderer';
// import MarkdownRenderer from './MarkdownRenderer';

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

const StyledContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 32px 12px 0px 12px;
`;

const StyledButtonContainer = styled.div`
	display: flex;
	margin: 24px 12px 0 12px;
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

type EurekaPostType = {
	feed: {
		id: number;
		title: string;
		user: {
			id: string;
			avater_url: string;
		};
		content: string;
		link: string;
		updated_date: string;
		views: number;
		likes: number;
		comments: number;
		images: { file_uri: string }[];
	};
};

const CommunityFeedItem: React.FC<EurekaPostType> = ({ feed }) => {
	const navigation = useNavigate();

	const onClickComment = useCallback(() => {
		console.log('댓글 클릭');
	}, []);

	// const onClickLike = useCallback(() => {
	// 	navigation(`repo/${feed.id}/like`);
	// }, []);

	return (
		<StyledFeedItemContainer>
			<StyledTopLine>
				<StyledProfileContainer>
					<StyledProfileImage src={feed.user.avater_url} alt="user_profile" />
					<p>{feed.user.id}</p>
				</StyledProfileContainer>
				<StyledUpdateTime>{feed.updated_date}</StyledUpdateTime>
			</StyledTopLine>
			<StyledContentContainer>{feed.content}</StyledContentContainer>
			<StyledButtonContainer>
				<img src={images.like} alt="like_button" />
				<img src={images.chat} alt="comment_button" />
				<img src={images.share} alt="share_button" />
			</StyledButtonContainer>
			<StyledSubDataContainer>
				<div>{`좋아요 ${feed.likes}개 · `}</div>
				<div onClick={onClickComment}>{`댓글 ${feed.comments}개`}</div>
			</StyledSubDataContainer>
		</StyledFeedItemContainer>
	);
};

export default CommunityFeedItem;

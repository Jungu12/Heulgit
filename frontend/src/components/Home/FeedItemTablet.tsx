import { colors } from '@constants/colors';
import { images } from '@constants/images';
import { HeulGitPostType } from '@typedef/home/heulgit.types';
import React, { useCallback } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MarkdownSummaryRenderer from './MarkdownSummaryRenderer';
import MarkdownRenderer from './MarkdownRenderer';
import { getTimeAgo } from '@utils/date';

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

const StyledUserMarker = styled.img`
	width: 25px;
	height: 25px;
`;

const StyledUpdateTime = styled.p`
	color: ${colors.greyScale.grey4};
	font-size: 12px;
	font-weight: 500;
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

type Props = {
	feed: HeulGitPostType;
	type: 'summary' | 'full';
	onClickComment?: (commentId: number) => void;
};

const FeedItemTablet = ({ feed, type, onClickComment }: Props) => {
	const navigation = useNavigate();
	const onClickLike = useCallback(() => {
		navigation(`repo/${feed.heulgitId}/like`);
	}, []);

	return (
		<StyledFeedItemContainer>
			<StyledTopLine>
				<StyledProfileContainer>
					<StyledProfileImage src={feed.avatarUrl} alt="user_profile" />
					<p>{feed.githubId}</p>
					{feed.registered && (
						<StyledUserMarker src={images.userMark} alt="user_marker" />
					)}
				</StyledProfileContainer>
				<StyledUpdateTime>{getTimeAgo(feed.updatedDate)}</StyledUpdateTime>
			</StyledTopLine>
			<StyledContentContainer>
				{type === 'full' ? (
					<MarkdownRenderer text={feed.content} />
				) : (
					<MarkdownSummaryRenderer text={feed.content} />
				)}
			</StyledContentContainer>
			<StyledButtonContainer>
				<img src={images.like} alt="like_button" />
				<img src={images.chat} alt="comment_button" />
				<img src={images.share} alt="share_button" />
			</StyledButtonContainer>
			<StyledSubDataContainer>
				<div
					onClick={onClickLike}
				>{`좋아요 ${feed.likedUsers.length}개 · `}</div>
				<div
					onClick={() => onClickComment && onClickComment(feed.heulgitId)}
				>{`댓글 ${feed.heulgitComments.length}개`}</div>
			</StyledSubDataContainer>
		</StyledFeedItemContainer>
	);
};

export default FeedItemTablet;

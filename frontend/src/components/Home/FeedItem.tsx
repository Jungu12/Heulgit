import { colors } from '@constants/colors';
import { images } from '@constants/images';
import { HeulGitPostType } from '@typedef/home/heulgit.types';
import React, { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import MarkdownSummaryRenderer from './MarkdownSummaryRenderer';
import MarkdownRenderer from './MarkdownRenderer';
import { getTimeAgo } from '@utils/date';
import { decodeUnicode } from '@utils/markdown';
import { findLikeUser } from '@utils/heulgit';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { authHttp } from '@utils/http';

const StyledFeedItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 16px;
	max-width: 100vw;
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

const StyledUserMarker = styled.img`
	width: 25px;
	height: 25px;
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

const StyledMoreDataText = styled.div`
	font-size: 14px;
	font-weight: 500;
	margin: 6px 0 0 auto;
	color: ${colors.greyScale.grey4};
`;

const StyledLink = styled(Link)`
	margin-left: auto;
`;

const StyledLinkImg = styled.img`
	width: 99px !important;
	height: 28px !important;
`;

type Props = {
	feed: HeulGitPostType;
	type: 'summary' | 'full' | 'search';
	onClickComment?: (commentId: number) => void;
};

const FeedItem = ({ feed, type, onClickComment }: Props) => {
	const user = useSelector((state: RootState) => state.user.user);
	const navigation = useNavigate();
	const [like, setLike] = useState(false);
	const [likeNum, setLikeNum] = useState(0);
	// const [content, setContent] = useState('');

	const onClickLike = useCallback(() => {
		navigation(`repo/${feed.heulgitId}/like`);
	}, [feed.heulgitId]);

	const onClickLikeIcon = useCallback(() => {
		authHttp.get(
			`heulgit/posts/like/${feed.heulgitId}?userId=${user?.githubId}`,
		);
		setLike(true);
		setLikeNum((prev) => prev + 1);
	}, [feed.heulgitId, user]);

	const onClickUnLikeIcon = useCallback(() => {
		authHttp.get(
			`heulgit/posts/unlike/${feed.heulgitId}?userId=${user?.githubId}`,
		);
		setLike(false);
		setLikeNum((prev) => prev - 1);
	}, [feed.heulgitId, user]);

	const onClickProfile = useCallback(() => {
		if (feed.registered) {
			navigation(`/profiles/${feed.githubId}`);
			return;
		}
		window.open(
			`https://github.com/${feed.githubId}`,
			'_blank',
			'noopener, noreferrer',
		);
	}, []);

	useEffect(() => {
		if (user && feed.likedUsers) {
			setLike(findLikeUser(feed.likedUsers, user.githubId));
			setLikeNum(feed.likedUsers.length);
		}
	}, [feed, user]);

	return (
		<StyledFeedItemContainer>
			<StyledTopLine>
				<StyledProfileContainer onClick={onClickProfile}>
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
					<MarkdownSummaryRenderer text={decodeUnicode(feed.content)} />
				)}
				{type !== 'full' ? (
					<StyledMoreDataText
						onClick={() => {
							navigation(`/repo/${feed.heulgitId}`);
						}}
					>
						...더보기
					</StyledMoreDataText>
				) : (
					''
				)}
			</StyledContentContainer>
			{type === 'search' ? (
				''
			) : (
				<StyledButtonContainer>
					{like ? (
						<img
							src={images.community.likesActive}
							alt="like_button"
							onClick={onClickUnLikeIcon}
						/>
					) : (
						<img
							src={images.like}
							alt="unlike_button"
							onClick={onClickLikeIcon}
						/>
					)}
					<img
						src={images.chat}
						alt="comment_button"
						onClick={
							onClickComment ? () => onClickComment(feed.heulgitId) : () => {}
						}
					/>
					<StyledLink
						to={`https://github.com/${feed.githubId}/${feed.heulgitName}`}
						target="_blank"
					>
						<StyledLinkImg src={images.gotoGit} />
					</StyledLink>
				</StyledButtonContainer>
			)}
			<StyledSubDataContainer>
				<div onClick={onClickLike}>{`좋아요 ${likeNum}개 · `}</div>
				<div
					onClick={() => {
						if (onClickComment) {
							onClickComment(feed.heulgitId);
						}
					}}
				>{`댓글 ${feed.heulgitComments.length}개`}</div>
				<div onClick={onClickLike}>{`스타 ${feed.star}개 · `}</div>
			</StyledSubDataContainer>
		</StyledFeedItemContainer>
	);
};

export default FeedItem;

import { colors } from '@constants/colors';
import { UserType } from '@typedef/common.types';
import { authHttp } from '@utils/http';
import React, { useCallback, useState } from 'react';
import { styled } from 'styled-components';

type StyledFollowButtonProps = {
	$following?: boolean;
};

const StyledLikeUser = styled.div`
	display: flex;
	position: relative;
	justify-content: space-between;

	height: 72px;

	margin-bottom: 32px;
`;

// 좋아요 한 사람 프로필 컨테이너
const StyledUserProfileContainer = styled.div`
	display: flex;
	flex-direction: row;

	margin-left: 20px;
`;

// 좋아요 한 사람 프로필 이미지
const StyledProfileImg = styled.img`
	display: flex;
	width: 72px;
	height: 72px;
	border-radius: 50%;
`;

// 좋아요 한 사람 닉네임
const StyledUserName = styled.div`
	display: flex;
	align-items: center;

	margin-left: 20px;

	font-size: 16px;
	font-weight: 600;
`;

// 팔로우 팔로잉 버튼 컨테이너
const StyledFollowButtonContainer = styled.div`
	display: flex;
	position: relative;
	align-items: center;

	margin-right: 20px;
`;

// 팔로우 팔로잉 버튼
const StyledFollowButton = styled.button<StyledFollowButtonProps>`
	align-items: center;

	width: 93px;
	height: 33px;

	border-radius: 8px;

	font-size: 14px;
	font-weight: 600;

	background-color: ${(props) =>
		props.$following ? colors.greyScale.grey3 : colors.primary.primary};
	color: ${(props) => (props.$following ? 'black' : 'white')};
`;

type Props = {
	user: {
		user: UserType;
		follow: boolean;
	};
};

const LikeUserItem = ({ user }: Props) => {
	const [isFollowed, setIsFollowed] = useState(user.follow);

	const onClickFollowButton = useCallback(() => {
		if (isFollowed) {
			authHttp
				.delete(`relations/unfollow?to=${user.user.githubId}`)
				.then(() => setIsFollowed(false));
		} else {
			authHttp
				.post(`relations/follow?to=${user.user.githubId}`)
				.then(() => setIsFollowed(true));
		}
	}, [isFollowed]);

	return (
		<StyledLikeUser key={user.user.githubId}>
			<StyledUserProfileContainer>
				<StyledProfileImg src={user.user.avatarUrl} alt="Profile" />
				<StyledUserName>{user.user.githubId}</StyledUserName>
			</StyledUserProfileContainer>
			<StyledFollowButtonContainer>
				<StyledFollowButton
					$following={isFollowed}
					onClick={onClickFollowButton}
				>
					{isFollowed ? '팔로잉' : '팔로우'}
				</StyledFollowButton>
			</StyledFollowButtonContainer>
		</StyledLikeUser>
	);
};

export default LikeUserItem;

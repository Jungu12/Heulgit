import Header from '@components/common/Header';
import { colors } from '@constants/colors';
import React, { useState } from 'react';
import { styled } from 'styled-components';
import { useLocation } from 'react-router-dom';
import { UserType } from '@typedef/common.types';

// 좋아요 한 사람 페이지 전체 컨테이너
const StyledLikeViewPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	height: 100vh;
`;

// 좋아하는 사람 컨테이너
const StyledLikeUserContainer = styled.div`
	display: flex;
	position: relative;
	flex-direction: row;
	justify-content: space-between;

	width: 100%;
	height: 52px;
	top: 56px;
	margin-bottom: 10px;
`;

// 좋아하는 사람 p 태그
const StyledLikeUserP = styled.div`
	display: flex;
	align-items: center;

	font-size: 18px;
	font-weight: 600;
	margin-left: 20px;
`;

// n 명
const StyledLikeUsersCount = styled.div`
	display: flex;
	align-items: center;

	font-size: 14px;
	font-weight: 500;
	color: ${colors.greyScale.grey4};

	margin-right: 20px;
`;

// 좋아요 한 사람 프로필 전체 컨테이너
const StyledUserContainer = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	overflow-y: scroll;

	top: 56px;
	width: 100%;
	height: 100%;

	/* bottom: 70px; */
`;

// 좋아요 한 사람 프로필 + 버튼 감싸는 컨테이너
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
	background-color: #000000;
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

type StyledFollowButtonProps = {
	$following?: boolean;
};

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

type NavigateProps = {
	state: {
		user: UserType[];
	};
};

const LikeViewPage: React.FC = () => {
	const [isFollowing, setIsFollowing] = useState(false);
	const { state } = useLocation() as NavigateProps; // useLocation() 훅 사용

	const handleFollowButtonClick = () => {
		setIsFollowing((prevState) => !prevState);
	};

	return (
		<StyledLikeViewPageContainer>
			<Header title="좋아요"></Header>
			<StyledLikeUserContainer>
				<StyledLikeUserP>좋아하는 사람</StyledLikeUserP>
				<StyledLikeUsersCount>{state.user.length}</StyledLikeUsersCount>
			</StyledLikeUserContainer>
			<StyledUserContainer>
				{state.user.map((user, index) => (
					<StyledLikeUser key={index}>
						<StyledUserProfileContainer>
							<StyledProfileImg src={user.avatarUrl} alt="Profile" />
							<StyledUserName>{user.githubId}</StyledUserName>
						</StyledUserProfileContainer>
						<StyledFollowButtonContainer>
							<StyledFollowButton
								$following={isFollowing}
								onClick={handleFollowButtonClick}
							>
								{isFollowing ? '팔로잉' : '팔로우'}
							</StyledFollowButton>
						</StyledFollowButtonContainer>
					</StyledLikeUser>
				))}
			</StyledUserContainer>
		</StyledLikeViewPageContainer>
	);
};

export default LikeViewPage;

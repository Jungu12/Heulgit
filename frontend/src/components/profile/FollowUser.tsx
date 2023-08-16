import { colors } from '@constants/colors';
import { UserFollowingType } from '@typedef/profile/user.types';
import React, { useState } from 'react';
import styled from 'styled-components';

type StyledFollowButtonProps = {
	$following?: boolean;
};

const StyledFollowUser = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 10px 30px;
`;
const StyledUser = styled.div`
	display: flex;
	align-items: center;
	height: 40px;
`;
const StyledUserImage = styled.img`
	border-radius: 50%;
	height: 40px;
	width: 40px;
	background-color: black;
`;
const StyledUserName = styled.div`
	margin-left: 10px;
`;
const StyledFollowButton = styled.button<StyledFollowButtonProps>`
	background-color: ${(props) =>
		props.$following ? colors.greyScale.grey3 : colors.primary.primary};
	color: ${(props) => (props.$following ? 'black' : 'white')};
	padding: 5px 10px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
`;

type FollowUserProps = {
	userData: UserFollowingType; // 유저 데이터를 전달받는 prop 추가
};

const FollowUser = ({ userData }: FollowUserProps) => {
	const [isFollowing, setIsFollowing] = useState(false); // 초기 값 설정

	const handleFollowButtonClick = () => {
		// 팔로우 버튼 클릭 시 팔로우 상태를 업데이트
		setIsFollowing((prevState) => !prevState);
	};

	return (
		<StyledFollowUser>
			<StyledUser>
				<StyledUserImage src={userData.avater_url} alt="User" />{' '}
				<StyledUserName>{userData.id}</StyledUserName>
			</StyledUser>
			<StyledFollowButton
				$following={isFollowing}
				onClick={handleFollowButtonClick}
			>
				{isFollowing ? '팔로잉' : '팔로우'}
			</StyledFollowButton>
		</StyledFollowUser>
	);
};

export default FollowUser;

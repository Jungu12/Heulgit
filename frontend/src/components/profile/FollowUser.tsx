import { colors } from '@constants/colors';
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

const FollowUser: React.FC = () => {
	const [isFollowing, setIsFollowing] = useState(false);

	const handleFollowButtonClick = () => {
		setIsFollowing((prevState) => !prevState);
	};

	return (
		<StyledFollowUser>
			<StyledUser>
				<StyledUserImage src="path_to_user_image.jpg" alt="User" />
				<StyledUserName>username</StyledUserName>
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

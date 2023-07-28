import { colors } from '@constants/colors';
import React, { useState } from 'react';
import styled from 'styled-components';

// ...

type StyledFollowButtonProps = {
	$following?: boolean; // Note the use of '$' prefix to indicate a transient prop
};

const StyledFollowUser = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 10px 30px;
`;

const StyledUserImage = styled.img`
	border-radius: 50%;
	height: 40px;
	/* width: 40px; */
	background-color: black;
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
			<StyledUserImage src="path_to_user_image.jpg" alt="User" />
			username
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

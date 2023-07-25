import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
	height: 55px;
`;
const StyledBackButton = styled.button``;
const StyledFollowCategory = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	height: 40px;
`;
const StyledUserList = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const StyledFollowUser = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 400px;
	height: 72px;
`;
const StyledFollowButton = styled.button``;

const FollowingPage = () => {
	return (
		<div>
			{' '}
			<StyledHeader>
				<StyledBackButton>◀</StyledBackButton>
				커뮤니티
			</StyledHeader>
			<hr />
			<StyledFollowCategory>
				<div>팔로잉</div>
				<div>팔로워</div>
			</StyledFollowCategory>
			<hr />
			<StyledUserList>
				User List
				<StyledFollowUser>
					<div>UserProfile</div>
					<StyledFollowButton>팔로우/팔로잉</StyledFollowButton>
				</StyledFollowUser>
				<StyledFollowUser>
					<div>UserProfile</div>
					<StyledFollowButton>팔로우/팔로잉</StyledFollowButton>
				</StyledFollowUser>
			</StyledUserList>
		</div>
	);
};

export default FollowingPage;

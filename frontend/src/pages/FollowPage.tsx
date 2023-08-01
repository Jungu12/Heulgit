import React from 'react';
import styled from 'styled-components';

import Header from '@components/common/Header';
import Category from '@components/profile/Category';
import FollowUser from '@components/profile/FollowUser';

const StyledHeader = styled.div`
	height: 55px;
`;
const StyledUserList = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10px;
`;

const FollowPage = () => {
	return (
		<div>
			<StyledHeader>
				<Header title={'username'}></Header>
			</StyledHeader>
			{/* <Category
				menu1={'팔로잉'}
				menu2={'팔로워'}
				menuRouter1={''}
				menuRouter2={''}
			/> */}
			<StyledUserList>
				{/* User List */}
				<FollowUser />
				<FollowUser />
				<FollowUser />
				<FollowUser />
				<FollowUser />
			</StyledUserList>
		</div>
	);
};

export default FollowPage;

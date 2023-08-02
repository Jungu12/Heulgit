import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Header from '@components/common/Header';
import Category from '@components/profile/Category';
import FollowUser from '@components/profile/FollowUser';
import Follower from '@components/profile/Follower';

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
	const [selectedFollow, setSelectedFollow] = useState('');

	const handleMenuClick = (menu: '팔로잉' | '팔로워') => {
		setSelectedFollow(menu);
		sessionStorage.setItem('selectedFollow', menu);
	};

	useEffect(() => {
		const categoryItem = sessionStorage.getItem('selectedFollow') as
			| '팔로잉'
			| '팔로워';

		if (categoryItem) {
			setSelectedFollow(categoryItem);
		} else {
			setSelectedFollow('팔로잉');
		}
	}, []);

	return (
		<div>
			<StyledHeader>
				<Header title={'username'}></Header>
			</StyledHeader>
			<Category
				menu1={'팔로잉'}
				menu2={'팔로워'}
				menuRouter1={() => handleMenuClick('팔로잉')}
				menuRouter2={() => handleMenuClick('팔로워')}
				selectedMenu={selectedFollow}
			/>
			{selectedFollow === '팔로잉' && (
				<StyledUserList>
					<FollowUser />
					<FollowUser />
					<FollowUser />
					<FollowUser />
					<FollowUser />
				</StyledUserList>
			)}
			{selectedFollow === '팔로워' && <Follower />}
		</div>
	);
};

export default FollowPage;

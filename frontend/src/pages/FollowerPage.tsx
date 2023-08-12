import React from 'react';
import styled from 'styled-components';
import Header from '@components/common/Header';
import FollowUser from '@components/profile/FollowUser';

const StyledBox = styled.div`
	/* height: 100vh; */

	overflow-y: auto;
	scrollbar-width: none; /* 파이어폭스 */
	/* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
	&::-webkit-scrollbar {
		display: none;
	}
`;

const StyledHeader = styled.div`
	height: 55px;
`;
const StyledUserList = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10px;
`;

const FollowerPage = () => {
	return (
		<StyledBox>
			<StyledHeader>
				<Header title={'팔로워'}></Header>
			</StyledHeader>
			<StyledUserList>
				<FollowUser />
				<FollowUser />
				<FollowUser />
				<FollowUser />
				<FollowUser />
				<FollowUser />
				<FollowUser />
				<FollowUser />
				<FollowUser />
				<FollowUser />
			</StyledUserList>
		</StyledBox>
	);
};

export default FollowerPage;

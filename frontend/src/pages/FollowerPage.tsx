import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from '@components/common/Header';
import FollowUser from '@components/profile/FollowUser';
import { authHttp } from '@utils/http';
import { UserFollowingType } from '@typedef/profile/user.types';
import { useLocation } from 'react-router-dom';

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
	const location = useLocation();
	const { userId } = location.state;

	// 팔로워 목록
	useEffect(() => {
		authHttp
			.get<UserFollowingType[]>(`relations/followers/${userId}`)
			.then((response) => {
				console.log(userId);
				console.log('팔로워 로드 성공.', response);
			})
			.catch((error) => {
				console.error('팔로워 로드 실패.', error);
			});
	}, []);

	return (
		<StyledBox>
			<StyledHeader>
				<Header title={'팔로워'}></Header>
			</StyledHeader>
			<StyledUserList>
				<FollowUser />
			</StyledUserList>
		</StyledBox>
	);
};

export default FollowerPage;

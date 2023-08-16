import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '@components/common/Header';
import FollowUser from '@components/profile/FollowUser';
import { authHttp } from '@utils/http';
import { UserFollowingType } from '@typedef/profile/user.types';
import { useParams } from 'react-router-dom';

const StyledBox = styled.div`
	overflow-y: auto;
	scrollbar-width: none;
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
	const { userId } = useParams();
	const [userFollowerData, setUserFollowerData] =
		useState<UserFollowingType[]>();

	useEffect(() => {
		authHttp
			.get<UserFollowingType[]>(`relations/followers/${userId}`)
			.then((response) => {
				console.log('팔로워 로드 성공.', userId, response);
				setUserFollowerData(response); // 받아온 데이터의 followers 배열을 상태에 저장
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
				{userFollowerData &&
					userFollowerData.map((followUser) => (
						<FollowUser userData={followUser} />
					))}
			</StyledUserList>
		</StyledBox>
	);
};

export default FollowerPage;

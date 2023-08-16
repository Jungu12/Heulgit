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

const FollowingPage = () => {
	const { userId } = useParams();
	const [userFollowingData, setUserFollowingData] =
		useState<UserFollowingType[]>();

	useEffect(() => {
		authHttp
			.get<UserFollowingType[]>(`relations/followings/${userId}`)
			.then((response) => {
				console.log('팔로잉 로드 성공.', userId, response);
				setUserFollowingData(response); // 받아온 데이터의 followings 배열을 상태에 저장
			})
			.catch((error) => {
				console.error('팔로잉 로드 실패.', error);
			});
	}, []);

	return (
		<StyledBox>
			<StyledHeader>
				<Header title={'팔로잉'}></Header>
			</StyledHeader>
			<StyledUserList>
				{userFollowingData &&
					userFollowingData.map((user) => (
						<FollowUser key={user.id} userData={user} />
					))}
			</StyledUserList>
		</StyledBox>
	);
};

export default FollowingPage;

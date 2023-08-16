import { UserType } from '@typedef/common.types';
import { UserPostType } from '@typedef/profile/user.types';
import { authHttp } from '@utils/http';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
// import { colors } from '@constants/colors';

const StyledBox = styled.div`
	margin-bottom: -70px;
	width: 100%;
`;

type MyProfileProps = {
	user: UserType;
};

const MyEureka = ({ user }: MyProfileProps) => {
	const { id } = useParams();

	// 작성한 유레카
	useEffect(() => {
		authHttp
			.get<UserPostType[]>(`eureka/myposts?userId=${id}&pages=1`)
			.then((response) => {
				console.log('유레카 성공.', response);
			})
			.catch((error) => {
				console.error('유레카 실패.', error);
			});
	}, []);

	return (
		<StyledBox>
			{user?.githubId}
			{/* <EurekaFeedItemListMobile feedList={dummyPosts} /> */}
		</StyledBox>
	);
};

export default MyEureka;

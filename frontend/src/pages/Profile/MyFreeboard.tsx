import React, { useEffect } from 'react';
import { styled } from 'styled-components';
// import FreeBoardFeedItemListMobile from '@pages/freeboard/FreeBoardFeedItemListMobile';
import { UserType } from '@typedef/common.types';
import { authHttp } from '@utils/http';
import { UserPostType } from '@typedef/profile/user.types';

const StyledBox = styled.div`
	margin-bottom: -70px;
	width: 100%;
`;

type MyProfileProps = {
	user: UserType;
};

const MyFreeboard = ({ user }: MyProfileProps) => {
	// 작성한 유레카
	useEffect(() => {
		authHttp
			.get<UserPostType[]>('freeboard/myposts?pages=1')
			.then((response) => {
				console.log('자유 성공.', response);
			})
			.catch((error) => {
				console.error('자유 실패.', error);
			});
	}, []);

	return (
		<StyledBox>
			{user?.githubId}
			{/* <FreeBoardFeedItemListMobile feedList={dummyPosts} /> */}
		</StyledBox>
	);
};

export default MyFreeboard;

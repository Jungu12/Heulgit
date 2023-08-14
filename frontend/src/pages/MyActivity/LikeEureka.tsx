import { UserLikePostType } from '@typedef/profile/user.types';
import { authHttp } from '@utils/http';
import React, { useEffect } from 'react';

const LikeEureka = () => {
	// 좋아요 게시물 불러오기
	useEffect(() => {
		authHttp
			.get<UserLikePostType[]>('users/activities/eureka/my-likes?pages=1')
			.then((response) => {
				console.log('좋아요 유레카 성공.', response);
			})
			.catch((error) => {
				console.error('좋아요 유레카 실패.', error);
			});
	}, []);

	return <div></div>;
};

export default LikeEureka;

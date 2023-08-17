import FreeBoardFeedItem from '@pages/freeboard/FreeBoardFeedItem';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FreeBoarFeedResponseType } from '@typedef/community/freeboard.types';
import { UserLikePostType } from '@typedef/profile/user.types';
import { authHttp } from '@utils/http';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const LikeFreeboard = () => {
	// 좋아요 게시물 불러오기
	useEffect(() => {
		authHttp
			.get<UserLikePostType[]>('users/activities/eureka/my-likes?pages=1')
			.then((response) => {
				console.log('좋아요 자유 성공.', response);
			})
			.catch((error) => {
				console.error('좋아요 자유 실패.', error);
			});
	}, []);

	const {
		data: freeBoardLikeList,
		fetchNextPage: freeBoardFetchNextPage,
		hasNextPage: freeBoardHasNextPage,
	} = useInfiniteQuery(
		['/my-likes/freeBoard'],
		({ pageParam = 1 }) =>
			authHttp.get<FreeBoarFeedResponseType>(
				`users/activities/eureka/my-likes?pages=${pageParam}`,
			),
		{
			getNextPageParam: (lastPage, allPages) => {
				if (lastPage.last) return;
				return allPages.length + 1;
			},
		},
	);

	return (
		<div>
			{freeBoardLikeList && (
				<InfiniteScroll
					dataLength={freeBoardLikeList.pages.length}
					next={freeBoardFetchNextPage}
					hasMore={freeBoardHasNextPage ? true : false}
					loader={<div>loading...</div>}
					style={{
						overflowY: 'scroll',
						overflowX: 'hidden',
					}}
				>
					{freeBoardLikeList.pages.map((freeBoard) =>
						freeBoard.content.map((item) => (
							<FreeBoardFeedItem key={item.freeBoardId} feed={item} />
						)),
					)}
				</InfiniteScroll>
			)}
		</div>
	);
};

export default LikeFreeboard;

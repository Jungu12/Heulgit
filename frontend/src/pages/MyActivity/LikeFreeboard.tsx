import FreeBoardFeedItem from '@pages/freeboard/FreeBoardFeedItem';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FreeBoarFeedResponseType } from '@typedef/community/freeboard.types';
import { authHttp } from '@utils/http';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const LikeFreeboard = () => {
	// 좋아요 게시물 불러오기
	const {
		data: freeLikeList,
		fetchNextPage: freeFetchNextPage,
		hasNextPage: freeHasNextPage,
	} = useInfiniteQuery(
		['/my-likes/heulgit'],
		({ pageParam = 1 }) =>
			authHttp.get<FreeBoarFeedResponseType>(
				`users/activities/freeboard/my-likes?pages=${pageParam}`,
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
			{freeLikeList && (
				<InfiniteScroll
					dataLength={freeLikeList.pages.length}
					next={freeFetchNextPage}
					hasMore={freeHasNextPage ? true : false}
					loader={<div>loading...</div>}
					height={`calc(100vh - 102px)`}
					style={{
						overflowY: 'scroll',
						overflowX: 'hidden',
					}}
				>
					{freeLikeList.pages.map((free) =>
						free.content.map((item) => (
							<FreeBoardFeedItem key={item.freeBoardId} feed={item} />
						)),
					)}
				</InfiniteScroll>
			)}
		</div>
	);
};

export default LikeFreeboard;

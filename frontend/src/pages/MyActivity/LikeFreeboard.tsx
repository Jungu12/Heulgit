import FreeBoardFeedItem from '@pages/freeboard/FreeBoardFeedItem';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FreeBoarFeedResponseType } from '@typedef/community/freeboard.types';
import { authHttp } from '@utils/http';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const LikeFreeboard = () => {
	// 좋아요 자유 불러오기
	const {
		data: likeFreeboardList,
		fetchNextPage: LikeFreeboardFetchNextPage,
		hasNextPage: LikeFreeboardHasNextPage,
	} = useInfiniteQuery(
		['/my-likes/freeboard'],
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
			{likeFreeboardList && (
				<InfiniteScroll
					dataLength={likeFreeboardList.pages.length}
					next={LikeFreeboardFetchNextPage}
					hasMore={LikeFreeboardHasNextPage ? true : false}
					loader={<div>loading...</div>}
					height={`calc(100vh - 102px)`}
					style={{
						overflowY: 'scroll',
						overflowX: 'hidden',
					}}
				>
					{likeFreeboardList.pages.map((free) =>
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

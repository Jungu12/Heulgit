import EurekaFeedItem from '@pages/Eureka/EurekaFeedItem';
import { useInfiniteQuery } from '@tanstack/react-query';
import { EurekaFeedResponseType } from '@typedef/community/eureka.types';
import { authHttp } from '@utils/http';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const LikeEureka = () => {
	// 좋아요 게시물 불러오기
	const {
		data: eurekaLikeList,
		fetchNextPage: eurekaFetchNextPage,
		hasNextPage: eurekaHasNextPage,
	} = useInfiniteQuery(
		['/my-likes/heulgit'],
		({ pageParam = 1 }) =>
			authHttp.get<EurekaFeedResponseType>(
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
			{eurekaLikeList && (
				<InfiniteScroll
					dataLength={eurekaLikeList.pages.length}
					next={eurekaFetchNextPage}
					hasMore={eurekaHasNextPage ? true : false}
					loader={<div>loading...</div>}
					height={`calc(100vh - 114px)`}
					style={{
						overflowY: 'scroll',
						overflowX: 'hidden',
					}}
				>
					{eurekaLikeList.pages.map((eureka) =>
						eureka.content.map((item) => (
							<EurekaFeedItem key={item.eurekaId} feed={item} />
						)),
					)}
				</InfiniteScroll>
			)}
		</div>
	);
};

export default LikeEureka;

import Loading from '@components/common/Loading';
import EurekaFeedItem from '@pages/Eureka/EurekaFeedItem';
import { useInfiniteQuery } from '@tanstack/react-query';
import { EurekaFeedResponseType } from '@typedef/community/eureka.types';
import { authHttp } from '@utils/http';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const LikeEureka = () => {
	// 좋아요 유레카 불러오기
	const {
		data: LikeEurekaList,
		fetchNextPage: LikeEurekaFetchNextPage,
		hasNextPage: LikeEurekaHasNextPage,
	} = useInfiniteQuery(
		['/my-likes/eureka'],
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
			{LikeEurekaList && (
				<InfiniteScroll
					dataLength={LikeEurekaList.pages.length}
					next={LikeEurekaFetchNextPage}
					hasMore={LikeEurekaHasNextPage ? true : false}
					loader={<Loading />}
					height={`calc(100vh - 102px)`}
					style={{
						overflowY: 'scroll',
						overflowX: 'hidden',
					}}
				>
					{LikeEurekaList.pages.map((eureka) =>
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

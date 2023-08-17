import React from 'react';
import { styled } from 'styled-components';
import { UserType } from '@typedef/common.types';
import { authHttp } from '@utils/http';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { EurekaFeedResponseType } from '@typedef/community/eureka.types';
import EurekaFeedItem from '@pages/Eureka/EurekaFeedItem';
import Loading from '@components/common/Loading';

const StyledBox = styled.div`
	width: 100%;
`;

type MyProfileProps = {
	loadeduser: UserType;
};

const MyEureka = ({ loadeduser }: MyProfileProps) => {
	console.log('userprofile:', { loadeduser });

	// 작성한 유레카 불러오기
	const {
		data: myEurekaList,
		fetchNextPage: myEurekaFetchNextPage,
		hasNextPage: myEurekaHasNextPage,
	} = useInfiniteQuery(
		['/my/eureka'],
		({ pageParam = 1 }) =>
			authHttp.get<EurekaFeedResponseType>(
				`eureka/myposts?userId=${loadeduser.githubId}&pages=${pageParam}`,
			),
		{
			getNextPageParam: (lastPage, allPages) => {
				if (lastPage.last) return;
				return allPages.length + 1;
			},
		},
	);

	return (
		<StyledBox>
			{loadeduser?.githubId}
			{myEurekaList && (
				<InfiniteScroll
					dataLength={myEurekaList.pages.length}
					next={myEurekaFetchNextPage}
					hasMore={myEurekaHasNextPage ? true : false}
					loader={<Loading />}
					style={{
						overflowY: 'hidden',
						overflowX: 'hidden',
					}}
				>
					{myEurekaList.pages.map((eureka) =>
						eureka.content.map((item) => (
							<EurekaFeedItem key={item.eurekaId} feed={item} />
						)),
					)}
				</InfiniteScroll>
			)}
		</StyledBox>
	);
};

export default MyEureka;

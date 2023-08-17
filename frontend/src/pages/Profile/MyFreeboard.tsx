import React from 'react';
import { styled } from 'styled-components';
import { UserType } from '@typedef/common.types';
import { authHttp } from '@utils/http';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FreeBoarFeedResponseType } from '@typedef/community/freeboard.types';
import FreeBoardFeedItem from '@pages/freeboard/FreeBoardFeedItem';
import Loading from '@components/common/Loading';
import { useParams } from 'react-router-dom';

const StyledBox = styled.div`
	width: 100%;
`;

type MyProfileProps = {
	loadeduser: UserType;
};

const MyFreeboard = ({ loadeduser }: MyProfileProps) => {
	const { userId } = useParams();

	// 작성한 유레카 불러오기
	const {
		data: myFreeBoardList,
		fetchNextPage: myFreeBoardFetchNextPage,
		hasNextPage: myFreeBoardHasNextPage,
	} = useInfiniteQuery(
		['/my/freeboard'],
		({ pageParam = 1 }) =>
			authHttp.get<FreeBoarFeedResponseType>(
				`freeboard/myposts?userId=${userId}&pages=${pageParam}`,
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
			{myFreeBoardList && (
				<InfiniteScroll
					dataLength={myFreeBoardList.pages.length}
					next={myFreeBoardFetchNextPage}
					hasMore={myFreeBoardHasNextPage ? true : false}
					loader={<Loading />}
					style={{
						overflowY: 'hidden',
						overflowX: 'hidden',
					}}
				>
					{myFreeBoardList.pages.map((freeboard) =>
						freeboard.content.map((item) => (
							<FreeBoardFeedItem key={item.freeBoardId} feed={item} />
						)),
					)}
				</InfiniteScroll>
			)}
		</StyledBox>
	);
};

export default MyFreeboard;

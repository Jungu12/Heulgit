import React from 'react';
import { styled } from 'styled-components';
import { UserType } from '@typedef/common.types';
import { authHttp } from '@utils/http';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FreeBoarFeedResponseType } from '@typedef/community/freeboard.types';
import FreeBoardFeedItem from '@pages/freeboard/FreeBoardFeedItem';

const StyledBox = styled.div`
	/* margin-bottom: -70px; */
	width: 100%;
`;

type MyProfileProps = {
	loadeduser: UserType;
};

const MyFreeboard = ({ loadeduser }: MyProfileProps) => {
	// 작성한 유레카 불러오기
	const {
		data: myFreeBoardList,
		fetchNextPage: myFreeBoardFetchNextPage,
		hasNextPage: myFreeBoardHasNextPage,
	} = useInfiniteQuery(
		['/my/freeboard'],
		({ pageParam = 1 }) =>
			authHttp.get<FreeBoarFeedResponseType>(
				`freeboard/myposts?userId=${loadeduser.githubId}&pages=${pageParam}`,
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
					loader={<div>loading...</div>}
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

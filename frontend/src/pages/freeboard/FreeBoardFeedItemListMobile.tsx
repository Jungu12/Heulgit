// 자유게시판 피드 리스트 모바일 버전

import React, { useRef } from 'react';
import { styled } from 'styled-components';
import { colors } from '@constants/colors';
import { FreeBoardPostType } from '@typedef/community/freeboard.types';
import FreeBoardFeedItem from './FreeBoardFeedItem';
import InfiniteScroll from 'react-infinite-scroll-component';

const StyledFeedListSection = styled.section`
	overflow-y: scroll;

	height: calc(100vh - 234px);
	margin-bottom: 70px;

	scrollbar-width: none; /* 파이어폭스 */
	/* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
	&::-webkit-scrollbar {
		display: none;
	}
`;

const Separation = styled.div`
	height: 1px;
	width: 100%;
	background-color: ${colors.greyScale.grey2};
	margin-top: 12px;
`;

type Props = {
	feedList: FreeBoardPostType[];
	freeBoardHasMore: boolean;
	freeboardNextPageLoad: () => Promise<void>;
};

const FreeBoardFeedItemListMobile = ({
	feedList,
	freeBoardHasMore,
	freeboardNextPageLoad,
}: Props) => {
	const scrollContinaerRef = useRef<HTMLDivElement>(null);

	return (
		<StyledFeedListSection ref={scrollContinaerRef}>
			<InfiniteScroll
				dataLength={feedList.length}
				next={freeboardNextPageLoad}
				hasMore={freeBoardHasMore}
				loader={<div>로딩 중...</div>}
				height={`calc(100vh - 234px)`}
			>
				{feedList.map((feed, index) => (
					<div key={index}>
						<FreeBoardFeedItem feed={feed} />
						<Separation />
					</div>
				))}
			</InfiniteScroll>
		</StyledFeedListSection>
	);
};

export default FreeBoardFeedItemListMobile;

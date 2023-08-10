// 유레카 피드 리스트 모바일 버전
import React, { useRef } from 'react';
import { styled } from 'styled-components';
import { colors } from '@constants/colors';
import { EurekaPostType } from '@typedef/community/eureka.types';
import EurekaFeedItem from './EurekaFeedItem';
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
	feedList: EurekaPostType[];
	eurekaHasMore: boolean;
	eurekaNextPageLoad: () => Promise<void>;
};

const EurekaFeedItemListMobile = ({
	feedList,
	eurekaHasMore,
	eurekaNextPageLoad,
}: Props) => {
	const scrollContinaerRef = useRef<HTMLDivElement>(null);

	return (
		<StyledFeedListSection className="thisThis" ref={scrollContinaerRef}>
			<InfiniteScroll
				dataLength={feedList.length}
				next={eurekaNextPageLoad}
				hasMore={eurekaHasMore}
				loader={<div>로딩중...</div>}
				height={`calc(100vh - 234px)`}
			>
				{feedList.map((feed, index) => (
					<div key={index}>
						<EurekaFeedItem feed={feed} />
						<Separation />
					</div>
				))}
			</InfiniteScroll>
		</StyledFeedListSection>
	);
};

export default EurekaFeedItemListMobile;

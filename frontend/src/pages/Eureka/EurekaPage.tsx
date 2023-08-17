// 커뮤니티 내 유레카 전체 페이지
import { Mobile, PC, Tablet } from '@components/common/MediaQuery';
import React from 'react';
import EurekaFeedItemListMobile from './EurekaFeedItemListMobile';
import EurekaFeedItemListTabletPC from './EurekaFeedItemListTabletPC';
import { useOutletContext } from 'react-router-dom';
import { EurekaPostType } from '@typedef/community/eureka.types';
import {
	FetchNextPageOptions,
	InfiniteData,
	InfiniteQueryObserverResult,
} from '@tanstack/react-query';

type OutletProps = {
	eurekaFeedList: InfiniteData<EurekaPostType[]> | undefined;
	eurekaFetchNextPage: (
		options?: FetchNextPageOptions | undefined,
	) => Promise<InfiniteQueryObserverResult<EurekaPostType[], unknown>>;
	eurekaHasNextPage: boolean | undefined;
	eurekaNextPageLoad: () => Promise<void>;
};

const EurekaPage = () => {
	const { eurekaFeedList, eurekaFetchNextPage, eurekaHasNextPage } =
		useOutletContext<OutletProps>();

	if (!eurekaFeedList) {
		return <div>loading...</div>;
	}

	return (
		<>
			<Mobile>
				<EurekaFeedItemListMobile
					feedList={eurekaFeedList}
					eurekaHasMore={eurekaHasNextPage ? true : false}
					eurekaFetchNextPage={eurekaFetchNextPage}
				/>
			</Mobile>
			<Tablet>
				<EurekaFeedItemListTabletPC feedList={eurekaFeedList.pages[0]} />
			</Tablet>
			<PC>
				<EurekaFeedItemListTabletPC feedList={eurekaFeedList.pages[0]} />
			</PC>
		</>
	);
};

export default EurekaPage;

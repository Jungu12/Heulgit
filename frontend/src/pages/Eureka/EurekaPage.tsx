// 커뮤니티 내 유레카 전체 페이지
import React from 'react';
import EurekaFeedItemListMobile from './EurekaFeedItemListMobile';
import { useOutletContext } from 'react-router-dom';
import {
	EurekaFeedResponseType,
	EurekaPostType,
} from '@typedef/community/eureka.types';
import {
	FetchNextPageOptions,
	InfiniteData,
	InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import Loading from '@components/common/Loading';

type OutletProps = {
	eurekaFeedList: InfiniteData<EurekaFeedResponseType> | undefined;
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
		return <Loading />;
	}

	return (
		<EurekaFeedItemListMobile
			feedList={eurekaFeedList}
			eurekaHasMore={eurekaHasNextPage ? true : false}
			eurekaFetchNextPage={eurekaFetchNextPage}
		/>
	);
};

export default EurekaPage;

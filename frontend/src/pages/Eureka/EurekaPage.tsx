// 커뮤니티 내 유레카 전체 페이지
import { Mobile, PC, Tablet } from '@components/common/MediaQuery';
import React, { useEffect } from 'react';
import EurekaFeedItemListMobile from './EurekaFeedItemListMobile';
import EurekaFeedItemListTabletPC from './EurekaFeedItemListTabletPC';
import { useOutletContext } from 'react-router-dom';
import { EurekaPostType } from '@typedef/community/eureka.types';

type OutletProps = {
	feedList: EurekaPostType[];
	eurekaHasMore: boolean;
	eurekaNextPageLoad: () => Promise<void>;
};

const EurekaPage = () => {
	const { feedList, eurekaHasMore, eurekaNextPageLoad } =
		useOutletContext<OutletProps>();

	if (!feedList.length) {
		return <div>loading...</div>;
	}

	return (
		<>
			<Mobile>
				<EurekaFeedItemListMobile
					feedList={feedList}
					eurekaHasMore={eurekaHasMore}
					eurekaNextPageLoad={eurekaNextPageLoad}
				/>
			</Mobile>
			<Tablet>
				<EurekaFeedItemListTabletPC feedList={feedList} />
			</Tablet>
			<PC>
				<EurekaFeedItemListTabletPC feedList={feedList} />
			</PC>
		</>
	);
};

export default EurekaPage;

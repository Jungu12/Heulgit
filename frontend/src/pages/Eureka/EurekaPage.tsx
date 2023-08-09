// 커뮤니티 내 유레카 전체 페이지
import { Mobile, PC, Tablet } from '@components/common/MediaQuery';
import React, { useEffect } from 'react';
import EurekaFeedItemListMobile from './EurekaFeedItemListMobile';
import EurekaFeedItemListTabletPC from './EurekaFeedItemListTabletPC';
import { useOutletContext } from 'react-router-dom';
import { EurekaPostType } from '@typedef/community/eureka.types';

type OutletProps = {
	feedList: EurekaPostType[];
};

const EurekaPage = () => {
	const { feedList } = useOutletContext<OutletProps>();

	useEffect(() => {
		console.log(feedList);
	}, []);

	if (!feedList.length) {
		return <div>loading...</div>;
	}

	return (
		<>
			<Mobile>
				<EurekaFeedItemListMobile feedList={feedList} />
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

// 커뮤니티 내 자유게시판 전체 페이지

import { Mobile, PC, Tablet } from '@components/common/MediaQuery';
import React, { useEffect } from 'react';
import FreeBoardFeedItemListMobile from '@pages/freeboard/FreeBoardFeedItemListMobile';
import { useOutletContext } from 'react-router';
import { FreeBoardPostType } from '@typedef/community/freeboard.types';
import { useOutletContext } from 'react-router-dom';

type OutletProps = {
	freeBoardFeedList: FreeBoardPostType[];
	freeBoardHasMore: boolean;
	freeboardNextPageLoad: () => Promise<void>;
};

const FreeBoardPage = () => {
	const { freeBoardFeedList, freeBoardHasMore, freeboardNextPageLoad } =
		useOutletContext<OutletProps>();

	useEffect(() => {
		console.log(freeBoardFeedList);
	}, []);

	if (!freeBoardFeedList.length) {
		return <div>loading...</div>;
	}

	return (
		<>
			<Mobile>
				<FreeBoardFeedItemListMobile
					feedList={freeBoardFeedList}
					freeBoardHasMore={freeBoardHasMore}
					freeboardNextPageLoad={freeboardNextPageLoad}
				/>
			</Mobile>

			<Tablet>
				{/* <FreeBoardFeedItemListTabletPC feedList={feedList} /> */}
			</Tablet>

			<PC>{/* <FreeBoardFeedItemListTabletPC feedList={feedList} /> */}</PC>
		</>
	);
};

export default FreeBoardPage;

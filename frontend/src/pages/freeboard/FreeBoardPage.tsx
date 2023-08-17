// 커뮤니티 내 자유게시판 전체 페이지

import { Mobile, PC, Tablet } from '@components/common/MediaQuery';
import React from 'react';
import FreeBoardFeedItemListMobile from '@pages/freeboard/FreeBoardFeedItemListMobile';
import { useOutletContext } from 'react-router-dom';
import {
	FetchNextPageOptions,
	InfiniteData,
	InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import { FreeBoardPostType } from '@typedef/community/freeboard.types';
import Loading from '@components/common/Loading';

type OutletProps = {
	freeboardFeedList: InfiniteData<FreeBoardPostType[]> | undefined;
	freeboardFetchNextPage: (
		options?: FetchNextPageOptions | undefined,
	) => Promise<InfiniteQueryObserverResult<FreeBoardPostType[], unknown>>;
	freeboardHasNextPage: boolean | undefined;
};

const FreeBoardPage = () => {
	const { freeboardFeedList, freeboardFetchNextPage, freeboardHasNextPage } =
		useOutletContext<OutletProps>();

	if (!freeboardFeedList) {
		return <Loading />;
	}

	return (
		<>
			<Mobile>
				<FreeBoardFeedItemListMobile
					freeboardFeedList={freeboardFeedList}
					freeboardFetchNextPage={freeboardFetchNextPage}
					freeboardHasNextPage={freeboardHasNextPage ? true : false}
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

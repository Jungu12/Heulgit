// 커뮤니티 내 자유게시판 전체 페이지

import { Mobile, PC, Tablet } from '@components/common/MediaQuery';
import { images } from '@constants/images';
import React from 'react';
import FreeBoardFeedItemListMobile from '@pages/freeboard/FreeBoardFeedItemListMobile';
import FreeBoardFeedItemListTabletPC from './FreeBoardFeedItemListTabletPC';

// 더미 게시물
const dummyPosts = [
	{
		id: 1,
		title: 'hihi',
		user: {
			id: 'jungu12',
			avater_url: images.dummy.dummy1,
		},
		content: 'eqweqwewq',
		link: 'dfkldfsdfds',
		updated_date: '2023-07-24',
		views: 100,
		likes: 10,
		comments: 12,
		images: [{ file_uri: '' }],
	},
	{
		id: 2,
		title: '일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십',
		user: {
			id: 'jungu12',
			avater_url: images.dummy.dummy1,
		},
		content:
			'일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십',
		link: 'dfkldfsdfds',
		updated_date: '2023-07-24',
		views: 100,
		likes: 10,
		comments: 12,
		images: [{ file_uri: images.dummy.dummy3 }],
	},
	{
		id: 4,
		title: 'hihi',
		user: {
			id: 'jungu12',
			avater_url: images.dummy.dummy1,
		},
		content: 'eqweqwewq',
		link: 'dfkldfsdfds',
		updated_date: '2023-07-24',
		views: 100,
		likes: 10,
		comments: 12,
		images: [{ file_uri: '' }],
	},
	{
		id: 3,
		title: 'hihi',
		user: {
			id: 'jungu12',
			avater_url: images.dummy.dummy1,
		},
		content: 'asdasdasdasdasd',
		link: 'dfkldfsdfds',
		updated_date: '2023-07-24',
		views: 100,
		likes: 10,
		comments: 12,
		images: [{ file_uri: images.dummy.dummy1 }],
	},
];

const FreeBoardPage = () => {
	return (
		<>
			<Mobile>
				<FreeBoardFeedItemListMobile feedList={dummyPosts} />
			</Mobile>

			<Tablet>
				<FreeBoardFeedItemListTabletPC feedList={dummyPosts} />
			</Tablet>

			<PC>
				<FreeBoardFeedItemListTabletPC feedList={dummyPosts} />
			</PC>
		</>
	);
};

export default FreeBoardPage;

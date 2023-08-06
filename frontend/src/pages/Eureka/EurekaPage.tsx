// 유레카 전체 피드

import { Mobile, PC, Tablet } from '@components/common/MediaQuery';
import { images } from '@constants/images';
import React from 'react';
import EurekaFeedItemListTablet from '@pages/Eureka/EurekaFeedItemListTablet';
import EurekaFeedItemListPC from './EurekaFeedItemListPC';
import EurekaFeedItemListMobile from './EurekaFeedItemListMobile';

// 더미 게시물
const dummyPosts = [
	{
		id: 1,
		title: '여기는 유레카',
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
		title: '유레카입니당 키키',
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
		images: [{ file_uri: '' }],
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
		images: [{ file_uri: images.dummy.dummy5 }],
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
		images: [{ file_uri: '' }],
	},
	{
		id: 1,
		title: '여기는 유레카',
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
		id: 1,
		title: '여기는 유레카',
		user: {
			id: 'jungu12',
			avater_url: images.dummy.dummy1,
		},
		content: '뀨?',
		link: 'dfkldfsdfds',
		updated_date: '2023-07-24',
		views: 100,
		likes: 10,
		comments: 12,
		images: [{ file_uri: images.dummy.dummy5 }],
	},
];

const EurekaPage = () => {
	return (
		<>
			<Mobile>
				<EurekaFeedItemListMobile feedList={dummyPosts} />
			</Mobile>
			<Tablet>
				<EurekaFeedItemListTablet feedList={dummyPosts} />
			</Tablet>
			<PC>
				<EurekaFeedItemListPC feedList={dummyPosts} />
			</PC>
		</>
	);
};

export default EurekaPage;

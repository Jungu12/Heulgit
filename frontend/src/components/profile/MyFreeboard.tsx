import React from 'react';
import { styled } from 'styled-components';
import { images } from '@constants/images';
import FreeBoardFeedItemListMobile from '@pages/freeboard/FreeBoardFeedItemListMobile';

const StyledBox = styled.div`
	margin-bottom: -70px;
	width: 100%;
`;

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

const MyFreeboard = () => {
	return (
		<StyledBox>
			{/* <FreeBoardFeedItemListMobile feedList={dummyPosts} /> */}
		</StyledBox>
	);
};

export default MyFreeboard;

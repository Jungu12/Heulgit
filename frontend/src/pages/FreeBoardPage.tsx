import EurekaFeedItemList from '@components/community/EurekaFeedItemList';
import FreeBoardFeedItemList from '@components/community/FreeBoardFeedItemList';
import { colors } from '@constants/colors';
import { images } from '@constants/images';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const StyledViewContainer = styled.div`
	display: flex;
	flex-direction: column;
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

const FreeBoardPage = () => {
	const navigation = useNavigate();

	return (
		<StyledViewContainer>
			<FreeBoardFeedItemList feedList={dummyPosts} />
		</StyledViewContainer>
	);
};

export default FreeBoardPage;

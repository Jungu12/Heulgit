// import Header from '@components/common/Header';
import Header from '@components/common/Header';
import CommunityFeedItem from '@components/community/CommunityFeedItem';
// import CommunityFeedItemList from '@components/community/CommunityFeedItemList';
import { colors } from '@constants/colors';
import { images } from '@constants/images';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const StyledViewContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const Separation = styled.div`
	background-color: ${colors.greyScale.grey3};
	width: 100%;
	height: 1px;
	margin-top: 20px;
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
		images: [{ file_uri: 'adfldskfjsdlk' }],
	},
	{
		id: 2,
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
		images: [{ file_uri: 'adfldskfjsdlk' }],
	},
];

const EurekaPage = () => {
	const navigation = useNavigate();

	return (
		<StyledViewContainer>
			<Header
				title={dummyPosts[0].title}
				onClickBackButton={() => {
					navigation('/');
				}}
			/>
			{dummyPosts.map((post) => (
				<React.Fragment key={post.id}>
					<CommunityFeedItem feed={post} />
					<Separation />
				</React.Fragment>
			))}
			{/* <CommunityFeedItemList comments={dummyComment} /> */}
		</StyledViewContainer>
	);
};

export default EurekaPage;

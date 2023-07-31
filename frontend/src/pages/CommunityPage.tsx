import Header from '@components/common/Header';
import Navigation from '@components/common/Navigation';
import CommunityCategory from '@components/community/CommunityCategory';
import CreateButton from '@components/community/CreateButton';
import FeedBottom from '@components/community/FeedBottom';
import FilterCategory from '@components/community/FilterCategory';
import { images } from '@constants/images';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import EurekaPage from './EurekaPage';

// 커뮤니티
const CommunityContainer = styled.div`
	display: flex;
	height: 100vh;
	flex-direction: column;
	align-items: center;
`;

// 피드 컨테이너
const StyledFeedContainer = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	overflow-y: scroll;

	top: 163px;
	width: 100%;
	/* background-color: aqua; */
	/* bottom: 70px; */
`;

// 더미 게시물
const dummyPosts = [
	{
		id: 1,
		title: 'hihi',
		user: {
			id: 'jungu12',
			avater_url: 'qweqweqweqw',
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
			avater_url: 'qweqweqweqw',
		},
		content: 'eqweqwewq',
		link: 'dfkldfsdfds',
		updated_date: '2023-07-24',
		views: 100,
		likes: 10,
		comments: 12,
		images: [{ file_uri: 'adfldskfjsdlk' }],
	},
];

const CommunityPage = () => {
	const navigation = useNavigate();

	return (
		<CommunityContainer>
			<Header title="커뮤니티" type="home" />
			<CommunityCategory />
			<FilterCategory />
			<StyledFeedContainer>
				<EurekaPage />
			</StyledFeedContainer>
			<CreateButton />
			<Navigation />
		</CommunityContainer>
	);
};

export default CommunityPage;

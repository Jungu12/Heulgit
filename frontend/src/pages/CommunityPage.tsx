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

	top: 170px;
	/* bottom: 70px; */
`;

// 피드 살려주세요
const StyledFeed = styled.section`
	display: flex;
	flex-direction: column;

	height: 400px;
	width: 390px;
`;

// 검색 버튼
// const StyledSearchButton = styled.img`
// 	height: 24px;
// 	width: 24px;
// 	margin-right: 14px;
// `;

const CommunityPage = () => {
	const navigation = useNavigate();

	return (
		<CommunityContainer>
			<Header title="커뮤니티" type="home">
				{/* <StyledSearchButton
					src={images.navigation.searchActive}
					alt="search button"
					onClick={() => navigation('/search')}
				/> */}
			</Header>
			<CommunityCategory />
			<FilterCategory />
			<StyledFeedContainer>
				<StyledFeed>
					피드입니다
					<FeedBottom />
				</StyledFeed>
				<StyledFeed>피드입니다</StyledFeed>
				<StyledFeed>피드입니다</StyledFeed>
				<StyledFeed>피드입니다</StyledFeed>
				<StyledFeed>피드입니다</StyledFeed>
				<StyledFeed>피드입니다</StyledFeed>
				<StyledFeed>피드입니다</StyledFeed>
				<StyledFeed>피드입니다</StyledFeed>
				<StyledFeed>피드입니다</StyledFeed>
			</StyledFeedContainer>
			<CreateButton />
			<Navigation />
		</CommunityContainer>
	);
};

export default CommunityPage;

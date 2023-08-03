import Header from '@components/common/Header';
import Navigation from '@components/common/Navigation';
import CommunityCategory from '@components/community/CommunityCategory';
import CreateButton from '@components/community/CreateButton';
import FilterCategory from '@components/community/FilterCategory';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// 커뮤니티
const CommunityContainer = styled.div`
	display: flex;
	height: 100vh;
	flex-direction: column;
	align-items: center;

	overflow-y: scroll;
	-ms-overflow-style: none; /* 인터넷 익스플로러 */
	scrollbar-width: none; /* 파이어폭스 */

	/* 스크롤바 숨기기 (인터넷 익스플로러, 파이어폭스 */
	&::-webkit-scrollbar {
		display: none; /* 크롬, 사파리, 엣지 */
	}
	&::-ms-scrollbar {
		display: none; /* 인터넷 익스플로러 */
	}
`;

// 피드 컨테이너
const StyledFeedContainer = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;

	top: 163px;
	width: 100%;
`;

const CommunityPage = () => {
	const navigation = useNavigate();

	return (
		<CommunityContainer>
			<Header title="커뮤니티" type="home" />
			<CommunityCategory />
			<FilterCategory />
			<StyledFeedContainer>
				<Outlet />
			</StyledFeedContainer>
			<CreateButton />
			<Navigation />
		</CommunityContainer>
	);
};

export default CommunityPage;

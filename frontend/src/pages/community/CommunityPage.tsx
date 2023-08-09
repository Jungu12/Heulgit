import Header from '@components/common/Header';
import { Mobile, PC, Tablet } from '@components/common/MediaQuery';
import Navigation from '@components/common/Navigation';
import CommunityCategory from '@components/community/CommunityCategory';
import FilterCategory from '@components/community/FilterCategory';
import React, { useCallback, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '@constants/colors';
import { images } from '@constants/images';
import CommunityMenuBarPC from './CommunityMenuBarPC';
import CommunityFilterPC from './CommunityFilterPC';
import TabletNavigation from '@components/common/TabletNavigation';
import Sidebar from '@components/common/Sidebar';
import CommunitySideBarContent from './CommunitySideBarContent';

// 커뮤니티 모바일 버전
const CommunityContainerMobile = styled.div`
	display: flex;
	height: calc(var(--vh, 1vh) * 100);
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

// 피드 컨테이너 모바일 버전
const StyledFeedContainerMobile = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;

	top: 163px;
	width: 100%;
`;
// 모바일 버전 끝

// 커뮤니티 테블릿 버전
const CommunityContainerTabletPC = styled.div`
	display: flex;
	justify-content: center;

	margin-left: 125px;
	height: 100vh;

	/* justify-content: space-between; */
	/* align-items: center; */

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

// 피드 컨테이너 테블릿 PC 버전
const StyledFeedContainerTabletPC = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;

	margin-top: 35px;
	/* width: 520px; */
`;
// 테블릿 버전 끝

// 피드 컨테이너 PC 버전
const StyledFeedContainerPC = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;

	/* width: 520px; */
	margin-top: 35px;
`;

// 게시물 작성 버튼 모바일
const StyledCreateButtonMobile = styled.button`
	display: flex;
	position: fixed;
	bottom: 100px;
	right: 40px;

	width: 70px;
	height: 70px;

	border: none;
	border-radius: 50%;
	background-color: ${colors.primary.primary};

	padding: 0;
	background-image: url(${images.community.createPost});
	background-size: 60%;
	background-repeat: no-repeat;
	background-position: center;
`;

const StyledFilterButton = styled.button`
	position: fixed;
	top: 32px;
	right: 30px;
	cursor: pointer;
	background: none;

	img {
		width: 44px;
		height: 44px;
	}
`;

const CommunityPage = () => {
	const navigation = useNavigate();

	const [isFilterOpen, setIsFilterOpen] = useState(false);

	const onClickFilter = useCallback(() => {
		setIsFilterOpen(true);
	}, []);

	const onClickClose = useCallback(() => {
		setIsFilterOpen(false);
	}, []);

	return (
		<>
			{/* 모바일 버전 */}
			<Mobile>
				<CommunityContainerMobile>
					<Header title="커뮤니티" type="home" />
					<CommunityCategory />
					<FilterCategory />
					<StyledFeedContainerMobile>
						<Outlet />
					</StyledFeedContainerMobile>
					<StyledCreateButtonMobile
						onClick={() => navigation('/community/free/post')}
					/>
					<Navigation />
				</CommunityContainerMobile>
			</Mobile>

			{/* 테블릿 버전 */}
			<Tablet>
				<CommunityContainerTabletPC>
					<TabletNavigation />
					<StyledFeedContainerTabletPC>
						<Outlet />
					</StyledFeedContainerTabletPC>
					{/* 우측 필터 버튼 */}
					<StyledFilterButton onClick={onClickFilter}>
						<img src={images.filter} alt="filter" />
					</StyledFilterButton>
					<Sidebar open={isFilterOpen}>
						<CommunitySideBarContent onClickClose={onClickClose} />
					</Sidebar>
				</CommunityContainerTabletPC>
			</Tablet>

			{/* 웹 버전 */}
			<PC>
				<CommunityContainerTabletPC>
					<CommunityMenuBarPC />
					<StyledFeedContainerPC>
						<Outlet />
					</StyledFeedContainerPC>
					<CommunityFilterPC />
				</CommunityContainerTabletPC>
			</PC>
		</>
	);
};

export default CommunityPage;

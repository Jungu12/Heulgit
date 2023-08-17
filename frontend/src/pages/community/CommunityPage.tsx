import Header from '@components/common/Header';
import Navigation from '@components/common/Navigation';
import CommunityCategory from '@components/community/CommunityCategory';
import FilterCategory from '@components/community/FilterCategory';
import React, { useCallback, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '@constants/colors';
import { images } from '@constants/images';
// import CommunityMenuBarPC from './CommunityMenuBarPC';
// import CommunityFilterPC from './CommunityFilterPC';
import { getEurekaFeedList } from '@utils/api/eureka/eurekaApi';
// import TabletNavigation from '@components/common/TabletNavigation';
// import Sidebar from '@components/common/Sidebar';
// import CommunitySideBarContent from './CommunitySideBarContent';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getFreeBoardFeedList } from '@utils/api/freeBoard/freeBoardApi';

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
// const CommunityContainerTabletPC = styled.div`
// 	display: flex;
// 	justify-content: center;

// 	margin-left: 125px;
// 	height: 100vh;

// 	/* justify-content: space-between; */
// 	/* align-items: center; */

// 	overflow-y: scroll;
// 	-ms-overflow-style: none; /* 인터넷 익스플로러 */
// 	scrollbar-width: none; /* 파이어폭스 */

// 	/* 스크롤바 숨기기 (인터넷 익스플로러, 파이어폭스 */
// 	&::-webkit-scrollbar {
// 		display: none; /* 크롬, 사파리, 엣지 */
// 	}
// 	&::-ms-scrollbar {
// 		display: none; /* 인터넷 익스플로러 */
// 	}
// `;

// 피드 컨테이너 테블릿 PC 버전
// const StyledFeedContainerTabletPC = styled.div`
// 	display: flex;
// 	position: relative;
// 	flex-direction: column;

// 	margin-top: 35px;
// 	/* width: 520px; */
// `;
// 테블릿 버전 끝

// 피드 컨테이너 PC 버전
// const StyledFeedContainerPC = styled.div`
// 	display: flex;
// 	position: relative;
// 	flex-direction: column;

// 	/* width: 520px; */
// 	margin-top: 35px;
// `;

// 게시물 작성 버튼 모바일
const StyledCreateButtonMobile = styled.button`
	display: flex;
	position: fixed;
	bottom: 100px;
	right: 30px;

	width: 56px;
	height: 56px;

	border: none;
	border-radius: 50%;
	background-color: ${colors.primary.primary};

	padding: 0;
	background-image: url(${images.community.createPost});
	background-size: 60%;
	background-repeat: no-repeat;
	background-position: center;
`;

// const StyledFilterButton = styled.button`
// 	position: fixed;
// 	top: 32px;
// 	right: 30px;
// 	cursor: pointer;
// 	background: none;

// 	img {
// 		width: 44px;
// 		height: 44px;
// 	}
// `;

const CommunityPage = () => {
	const InfinityContainerRef = document.querySelector(
		'.infinite-scroll-component',
	);
	const navigation = useNavigate();
	// const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [seletedCommunityTitle, setSeletedCommunityTitle] = useState('유레카');
	const [seletedSort, setSeletedSort] = useState('전체 보기');

	// const onClickFilter = useCallback(() => {
	// 	setIsFilterOpen(true);
	// }, []);

	// const onClickClose = useCallback(() => {
	// 	setIsFilterOpen(false);
	// }, []);

	// 선택된 카테고리 버튼을 토글하는 함수
	const toggleActive = (category: string) => {
		setSeletedCommunityTitle(category);
		if (category === '유레카') {
			navigation('/community/eureka'); // '유레카' 버튼을 클릭했을 때 '/community/eureka'로 이동
		} else {
			navigation('/community/free'); // '자유게시판' 버튼을 클릭했을 때 '/community/free'로 이동
		}
	};

	const chageCommunityTitle = useCallback((category: string) => {
		if (category === '자유게시판') {
			return 'free';
		}
		return 'eureka';
	}, []);

	// 유레카 무한 리스트 불러오기 부분
	const {
		data: eurekaFeedList,
		fetchNextPage: eurekaFetchNextPage,
		hasNextPage: eurekaHasNextPage,
	} = useInfiniteQuery(
		['/eureka/lists', seletedSort],
		({ pageParam = 1 }) => getEurekaFeedList(seletedSort, pageParam),
		{
			getNextPageParam: (lastPage, allPages) => {
				if (lastPage.last) return;
				return allPages.length + 1;
			},
		},
	);

	// 자유게시판 무한 리스트 불러오기 부분
	const {
		data: freeboardFeedList,
		fetchNextPage: freeboardFetchNextPage,
		hasNextPage: freeboardHasNextPage,
	} = useInfiniteQuery(
		['/freeboard/lists', seletedSort],
		({ pageParam = 1 }) => getFreeBoardFeedList(seletedSort, pageParam),
		{
			getNextPageParam: (lastPage, allPages) => {
				if (lastPage.last) return;
				return allPages.length + 1;
			},
		},
	);

	useEffect(() => {
		if (InfinityContainerRef) InfinityContainerRef.scrollTop = 0;
	}, [seletedSort, seletedCommunityTitle]);

	return (
		<CommunityContainerMobile>
			<Header title="커뮤니티" type="home" />
			<CommunityCategory
				button={seletedCommunityTitle}
				toggleActive={toggleActive}
				setButton={setSeletedCommunityTitle}
			/>
			<FilterCategory button={seletedSort} setButton={setSeletedSort} />
			<StyledFeedContainerMobile>
				<Outlet
					context={{
						eurekaFeedList,
						eurekaFetchNextPage,
						eurekaHasNextPage,
						freeboardFeedList,
						freeboardFetchNextPage,
						freeboardHasNextPage,
					}}
				/>
			</StyledFeedContainerMobile>
			<StyledCreateButtonMobile
				onClick={() =>
					navigation(
						`/community/${chageCommunityTitle(seletedCommunityTitle)}/post`,
					)
				}
			/>
			<Navigation />
		</CommunityContainerMobile>
	);
};

export default CommunityPage;

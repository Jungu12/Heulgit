import Header from '@components/common/Header';
import { Mobile, PC, Tablet } from '@components/common/MediaQuery';
import Navigation from '@components/common/Navigation';
import CommunityCategory from '@components/community/CommunityCategory';
import FilterCategory from '@components/community/FilterCategory';
import React, { useCallback, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '@constants/colors';
import { images } from '@constants/images';
import CommunityMenuBarPC from './CommunityMenuBarPC';
import CommunityFilterPC from './CommunityFilterPC';
import { EurekaPostType } from '@typedef/community/eureka.types';
import { getEurekaFeedList } from '@utils/api/eureka/eurekaApi';
import TabletNavigation from '@components/common/TabletNavigation';
import Sidebar from '@components/common/Sidebar';
import CommunitySideBarContent from './CommunitySideBarContent';
import { getFreeBoardFeedList } from '@utils/api/freeBoard/freeBoardApi';
import { FreeBoardPostType } from '@typedef/community/freeboard.types';
import { useInfiniteQuery } from '@tanstack/react-query';

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
	const [page, setPage] = useState(1);
	const [feedList, setFeedList] = useState<EurekaPostType[]>([]);
	const [freeBoardFeedList, setfreeBoardFeedList] = useState<
		FreeBoardPostType[]
	>([]);

	const [seletedCommunityTitle, setSeletedCommunityTitle] = useState('유레카');
	const [seletedSort, setSeletedSort] = useState('전체 보기');
	const [eurekaHasMore, setEurekaHasMore] = useState(true);

	const onClickFilter = useCallback(() => {
		setIsFilterOpen(true);
	}, []);

	const onClickClose = useCallback(() => {
		setIsFilterOpen(false);
	}, []);

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

	const eurekaNextPageLoad = useCallback(async () => {
		const nextPage = page + 1;
		setPage(nextPage);
		setEurekaHasMore(false);
		getEurekaFeedList(seletedSort, nextPage).then((res) => {
			if (res.length < 20) {
				setEurekaHasMore(false);
			}
			const newFeedList = [...feedList, ...res];
			setFeedList(newFeedList);
			setEurekaHasMore(true);
		});
	}, [seletedSort, page, feedList]);

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
				console.log('[allPage]', allPages);

				if (lastPage.length < 20) return;
				return allPages.length + 1;
			},
			staleTime: 100000,
		},
	);

	// 컴포넌트 렌더링 시 FeedList 불러옴
	useEffect(() => {
		getEurekaFeedList(seletedSort, page).then((res) => {
			if (res.length < 20) {
				setEurekaHasMore(false);
			}
			setFeedList(res);
		});
	}, []);

	useEffect(() => {
		if (seletedCommunityTitle === '유레카') {
			getEurekaFeedList(seletedSort, page).then((res) => {
				setFeedList((prev) => [...prev, ...res]);
			});
		} else if (seletedCommunityTitle === '자유게시판') {
			getFreeBoardFeedList(seletedSort, page).then((res) => {
				console.log(res);

				setfreeBoardFeedList(res);
			});
		}
	}, [seletedCommunityTitle, page]);

	useEffect(() => {
		console.log('[현재 페이지]', page);
	}, [page]);

	useEffect(() => {
		if (seletedCommunityTitle === '유레카') {
			setPage(1);
			setFeedList([]);
			getEurekaFeedList(seletedSort, 1).then((res) => {
				setFeedList(res);
			});
		}

		if (seletedCommunityTitle === '자유게시판') {
			getFreeBoardFeedList(seletedSort, page).then((res) => {
				setfreeBoardFeedList(res);
			});
		}
	}, [seletedSort]);

	return (
		<>
			{/* 모바일 버전 */}
			<Mobile>
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
								freeBoardFeedList,
								eurekaHasMore,
								eurekaNextPageLoad,
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

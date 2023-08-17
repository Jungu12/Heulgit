import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '@components/common/Header';
import BigHeader from '@components/profile/BigHeader';
import { colors } from '@constants/colors';
import { authHttp } from '@utils/http';
import InfiniteScroll from 'react-infinite-scroll-component';
import FeedItem from '@components/Home/FeedItem';
import { useInfiniteQuery } from '@tanstack/react-query';
import { HeulgitPostResponseType } from '@typedef/home/heulgit.types';

const StyledBox = styled.div`
	height: 100vh;
	@media (min-width: 768px) {
		display: flex;
		justify-content: center;
	}

	overflow-y: auto;
	scrollbar-width: none; /* 파이어폭스 */
	/* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
	&::-webkit-scrollbar {
		display: none;
	}
`;

const StyledSideL = styled.div`
	height: 100vh;
	left: 0;
	position: fixed;

	@media (max-width: 767px) {
		display: none;
	}
	@media (min-width: 768px) {
		width: 124px;
		background-color: ${colors.primary.primary};
	}
	@media (min-width: 1200px) {
		width: 242px;
		background-color: ${colors.primary.primary};
	}
`;
const StyledSideR = styled.div`
	height: 100vh;
	right: 0;
	position: fixed;

	@media (max-width: 767px) {
		display: none;
	}
	@media (min-width: 768px) {
		width: 124px;
		background-color: ${colors.primary.primary};
	}
	@media (min-width: 1200px) {
		width: 242px;
		background-color: ${colors.primary.primary};
	}
`;
const StyledContent = styled.div`
	@media (min-width: 768px) {
		width: 500px;
	}
`;

const StyledHeader = styled.div`
	width: 100%;
	height: 60px;
	background-color: white;
`;

const StyledLikeRepo = styled.div`
	margin-top: -123px;
`;

const MyLikeRepoPage = () => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	// 화면 사이즈별 타이틀 변환
	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	// 좋아요 흘깃 불러오기
	const {
		data: heulgitLikeList,
		fetchNextPage: heulgitFetchNextPage,
		hasNextPage: heulgitHasNextPage,
	} = useInfiniteQuery(
		['/my-likes/heulgit'],
		({ pageParam = 1 }) =>
			authHttp.get<HeulgitPostResponseType>(
				`users/activities/heulgit/my-likes?pages=${pageParam}`,
			),
		{
			getNextPageParam: (lastPage, allPages) => {
				if (lastPage.last) return;
				return allPages.length + 1;
			},
		},
	);

	return (
		<StyledBox>
			<StyledSideL>
				<div>네비게이션</div>
			</StyledSideL>

			<StyledContent>
				<StyledHeader>
					{windowWidth <= 768 ? (
						<Header title={'좋아요 한 흘깃'}></Header>
					) : (
						<BigHeader title={'좋아요 한 흘깃'}></BigHeader>
					)}
				</StyledHeader>
				<StyledLikeRepo>
					{heulgitLikeList && (
						<InfiniteScroll
							dataLength={heulgitLikeList.pages.length}
							next={heulgitFetchNextPage}
							hasMore={heulgitHasNextPage ? true : false}
							loader={<div>loading...</div>}
							style={{
								overflowY: 'scroll',
								overflowX: 'hidden',
							}}
						>
							{heulgitLikeList.pages.map((heulgit) =>
								heulgit.content.map((item) => (
									<FeedItem key={item.heulgitId} feed={item} type="summary" />
								)),
							)}
						</InfiniteScroll>
					)}
				</StyledLikeRepo>
			</StyledContent>

			<StyledSideR>
				<div>카테고리</div>
			</StyledSideR>
		</StyledBox>
	);
};

export default MyLikeRepoPage;

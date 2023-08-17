import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '@components/common/Header';
import BigHeader from '@components/profile/BigHeader';
import { colors } from '@constants/colors';
// import { authHttp } from '@utils/http';
// import { UserCommentType } from '@typedef/profile/user.types';
// import { useInfiniteQuery } from "@tanstack/react-query";
// import InfiniteScroll from "react-infinite-scroll-component";
// import Comment from "@components/Home/Comment";

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
const StyledMyComment = styled.div``;

const MyCommentPage = () => {
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

	// // 댓글 불러오기
	// useEffect(() => {
	// 	authHttp
	// 		.get<UserCommentType>('users/activities/my-comments')
	// 		.then((response) => {
	// 			console.log('내 댓글 성공.', response);
	// 		})
	// 		.catch((error) => {
	// 			console.error('내 댓글 실패.', error);
	// 		});
	// }, []);

	// // 좋아요 게시물 불러오기
	// const {
	// 	data: eurekaLikeList,
	// 	fetchNextPage: eurekaFetchNextPage,
	// 	hasNextPage: eurekaHasNextPage,
	// } = useInfiniteQuery(
	// 	['/my-likes/heulgit'],
	// 	({ pageParam = 1 }) =>
	// 		authHttp.get<UserCommentType>(
	// 			`users/activities/eureka/my-likes?pages=${pageParam}`,
	// 		),
	// 	{
	// 		getNextPageParam: (lastPage, allPages) => {
	// 			if (lastPage.last) return;
	// 			return allPages.length + 1;
	// 		},
	// 	},
	// );

	return (
		<StyledBox>
			<StyledSideL>
				<div>네비게이션</div>
			</StyledSideL>

			<StyledContent>
				<StyledHeader>
					{windowWidth <= 768 ? (
						<Header title={'내가 작성한 댓글'}></Header>
					) : (
						<BigHeader title={'내가 작성한 댓글'}></BigHeader>
					)}
				</StyledHeader>
				<StyledMyComment>
					{/* {eurekaLikeList && (
						<InfiniteScroll
							dataLength={eurekaLikeList.pages.length}
							next={eurekaFetchNextPage}
							hasMore={eurekaHasNextPage ? true : false}
							loader={<div>loading...</div>}
							height={`calc(100vh - 102px)`}
							style={{
								overflowY: 'scroll',
								overflowX: 'hidden',
							}}
						>
							{eurekaLikeList.pages.map((eureka) =>
								eureka.content.map((item) => (
									<Comment key={item.eurekaId} feed={item} />
								)),
							)}
						</InfiniteScroll>
					)} */}
				</StyledMyComment>
			</StyledContent>

			<StyledSideR>
				<div>카테고리</div>
			</StyledSideR>
		</StyledBox>
	);
};

export default MyCommentPage;

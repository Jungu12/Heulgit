import FeedItem from '@components/Home/FeedItem';
import { colors } from '@constants/colors';
import { images } from '@constants/images';
import useDetectClose from '@hooks/useDetectClose';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { UserType } from '@typedef/common.types';
import { EurekaFeedResponseType } from '@typedef/community/eureka.types';
import { HeulgitPostResponseType } from '@typedef/home/heulgit.types';
import { authHttp } from '@utils/http';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import EurekaFeedItem from './Eureka/EurekaFeedItem';
import FreeBoardFeedItem from './freeboard/FreeBoardFeedItem';
import { FreeBoarFeedResponseType } from '@typedef/community/freeboard.types';
import Loading from '@components/common/Loading';

type StyledCategoryItemProps = {
	$isSeleted: boolean;
};

const StyledSearchResultContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100%;
	position: relative;
`;

const StyledHeaderContainer = styled.div`
	display: flex;
	position: absolute;
	top: 0;
	width: 100%;
	font-size: 18px;
	font-weight: 500;
	height: 56px;
	align-items: center;
	border-bottom: 1px solid ${colors.greyScale.grey3};
`;

const StyledHeaderTitle = styled.p`
	margin-left: 18px;
`;

const StyledBackButton = styled.img`
	height: 24px;
	width: 24px;
	margin-left: 8px;
	cursor: pointer;
`;

const StyledCategory = styled.div`
	display: flex;
	margin-top: 56px;
`;

const StyledCategoryItem = styled.div<StyledCategoryItemProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
	height: 48px;
	border-bottom: 1px solid ${colors.greyScale.grey3};
	font-size: 16px;
	font-weight: 600;
	color: ${colors.greyScale.grey4};
	cursor: pointer;

	${(props) =>
		props.$isSeleted &&
		`
    border-bottom-color: ${colors.primary.primary};
    color: black;
  `}
`;

const StyledFilter = styled.div`
	margin-left: auto;
	margin-right: 12px;
	display: flex;
	margin-top: 16px;
	align-items: center;

	img {
		height: 12px;
		width: 12px;
	}
`;

const StyledFilterText = styled.p`
	font-size: 14px;
	font-weight: 400;
	margin-right: 6px;
`;

const StyledDropDown = styled.ul`
	display: flex;
	flex-direction: column;
	background: ${colors.primary.primary};
	border-radius: 8px;
	position: absolute;
	top: 143px;
	right: 4px;
	width: 90px;
	box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
	opacity: 0;
	visibility: hidden;
	transform: translateY(-20px);
	transition:
		opacity 0.4s ease,
		transform 0.4s ease,
		visibility 0.4s;
	padding: 10px;
	color: #fff;
	font-size: 14px;
	font-weight: 700;
	line-height: 26px;
	letter-spacing: -0.24px;
	gap: 4px;
	z-index: 10;
	cursor: pointer;

	&.active {
		opacity: 1;
		visibility: visible;
		transform: translateY(0);
	}

	li {
		cursor: pointer;
	}
`;

const StyledContentList = styled.section`
	display: flex;
	flex: 1;
	overflow-y: scroll;
	overflow-x: hidden;
	flex-direction: column;
`;

const StyledUserContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow-y: scroll;
`;

const StyledUserItem = styled.div`
	display: flex;
	flex: 1;
	align-items: center;
	height: 80px;
	width: 100%;
	padding: 12px 16px;
	cursor: pointer;

	img {
		width: 48px;
		height: 48px;
		margin-right: 16px;
		border-radius: 50%;
		margin-right: 12px;
	}
`;

const StyledUserID = styled.p`
	font-size: 18px;
	font-weight: 700;
`;

const Seperation = styled.div`
	height: 1px;
	width: 100%;
	background-color: rgb(238, 238, 238);
	margin-top: 12px;
`;

const SearchResultPage = () => {
	const navigation = useNavigate();
	const dropDownRef = useRef(null);
	const [isViewOptionOpen, setIsViewOptionOpen] = useDetectClose(
		dropDownRef,
		false,
	);
	const [seletedCategory, setSeletedCategory] = useState('흘깃');
	const [seletedFilter, setSeletedFilter] = useState('타이틀');
	const { q } = useParams();

	const onClickCategory = useCallback((category: string) => {
		setSeletedCategory(category);
	}, []);

	const onClickFilter = useCallback((filter: string) => {
		setSeletedFilter(filter);
		setIsViewOptionOpen(false);
	}, []);

	// 검색 api 호출
	// 흘깃 검색 호출
	const {
		data: heulgitList,
		fetchNextPage: heulgitFetchNextPage,
		hasNextPage: heulgitHasNextPage,
		refetch: heulgitRefetch,
	} = useInfiniteQuery(
		['/search/heulgit'],
		({ pageParam = 1 }) =>
			authHttp.get<HeulgitPostResponseType>(
				`search/heulgit-${
					seletedFilter === '작성자' ? 'user' : 'title'
				}?keyword=${q}&pages=${pageParam}`,
			),
		{
			getNextPageParam: (lastPage, allPages) => {
				if (lastPage.last) return;
				return allPages.length + 1;
			},
		},
	);
	// 유레카 검색 호출
	const {
		data: eurekaList,
		fetchNextPage: eurekaFetchNextPage,
		hasNextPage: eurekaHasNextPage,
		refetch: eurekaRefetch,
	} = useInfiniteQuery(
		['/search/eureka'],
		({ pageParam = 1 }) =>
			authHttp.get<EurekaFeedResponseType>(
				`search/eureka-${
					seletedFilter === '작성자' ? 'user' : 'title'
				}?keyword=${q}&pages=${pageParam}`,
			),
		{
			getNextPageParam: (lastPage, allPages) => {
				if (lastPage.last) return;
				return allPages.length + 1;
			},
		},
	);
	// 자유게시판 검색 호출
	const {
		data: freeBoardList,
		fetchNextPage: freeBoardFetchNextPage,
		hasNextPage: freeBoardHasNextPage,
		refetch: freeBoardRefetch,
	} = useInfiniteQuery(
		['/search/freeBoard'],
		({ pageParam = 1 }) =>
			authHttp.get<FreeBoarFeedResponseType>(
				`search/freeboard-${
					seletedFilter === '작성자' ? 'user' : 'title'
				}?keyword=${q}&pages=${pageParam}`,
			),
		{
			getNextPageParam: (lastPage, allPages) => {
				if (lastPage.last) return;
				return allPages.length + 1;
			},
		},
	);
	// 사용자 검색 호출
	const { data: userList } = useQuery(['/serach/user'], () =>
		authHttp.get<UserType[]>(`search/user?keyword=${q}`),
	);

	useEffect(() => {
		heulgitRefetch();
		eurekaRefetch();
		freeBoardRefetch();
	}, [seletedFilter]);

	return (
		<StyledSearchResultContainer>
			<StyledHeaderContainer>
				<StyledBackButton
					src={images.header.back}
					alt="back"
					onClick={() => navigation('/search')}
				/>
				<StyledHeaderTitle>{q}</StyledHeaderTitle>
			</StyledHeaderContainer>
			<StyledCategory>
				<StyledCategoryItem
					$isSeleted={seletedCategory === '흘깃'}
					onClick={() => onClickCategory('흘깃')}
				>
					흘깃
				</StyledCategoryItem>
				<StyledCategoryItem
					$isSeleted={seletedCategory === '유레카'}
					onClick={() => onClickCategory('유레카')}
				>
					유레카
				</StyledCategoryItem>
				<StyledCategoryItem
					$isSeleted={seletedCategory === '자유게시판'}
					onClick={() => onClickCategory('자유게시판')}
				>
					자유게시판
				</StyledCategoryItem>
				<StyledCategoryItem
					$isSeleted={seletedCategory === '사용자'}
					onClick={() => onClickCategory('사용자')}
				>
					사용자
				</StyledCategoryItem>
			</StyledCategory>
			{seletedCategory === '사용자' ? (
				''
			) : (
				<StyledFilter
					ref={dropDownRef}
					onClick={() => setIsViewOptionOpen(!isViewOptionOpen)}
				>
					<StyledFilterText>{seletedFilter}</StyledFilterText>
					<img
						src={isViewOptionOpen ? images.arrowUpBlack : images.arrowDownBlack}
						alt="filter"
					/>
				</StyledFilter>
			)}
			<StyledDropDown className={isViewOptionOpen ? 'active' : ''}>
				<li onClick={() => onClickFilter('타이틀')}>타이틀</li>
				<li onClick={() => onClickFilter('작성자')}>작성자</li>
			</StyledDropDown>
			<StyledContentList>
				{seletedCategory === '흘깃' && heulgitList && (
					<InfiniteScroll
						dataLength={heulgitList.pages.length}
						next={heulgitFetchNextPage}
						hasMore={heulgitHasNextPage ? true : false}
						loader={<Loading />}
						height={`calc(100vh - 118px)`}
						style={{
							overflowY: 'scroll',
							overflowX: 'hidden',
						}}
					>
						{heulgitList.pages.map((heulgit) =>
							heulgit.content.map((item) => (
								<div key={item.heulgitId}>
									<FeedItem feed={item} type="search" />
									<Seperation />
								</div>
							)),
						)}
					</InfiniteScroll>
				)}
				{seletedCategory === '유레카' && eurekaList && (
					<InfiniteScroll
						dataLength={eurekaList.pages.length}
						next={eurekaFetchNextPage}
						hasMore={eurekaHasNextPage ? true : false}
						loader={<Loading />}
						height={`calc(100vh - 134px)`}
						style={{
							overflowY: 'scroll',
							overflowX: 'hidden',
						}}
					>
						{eurekaList.pages.map((eureka) =>
							eureka.content.map((item) => (
								<div key={item.eurekaId}>
									<EurekaFeedItem feed={item} />
									<Seperation />
								</div>
							)),
						)}
					</InfiniteScroll>
				)}
				{seletedCategory === '자유게시판' && freeBoardList && (
					<InfiniteScroll
						dataLength={freeBoardList.pages.length}
						next={freeBoardFetchNextPage}
						hasMore={freeBoardHasNextPage ? true : false}
						loader={<Loading />}
						height={`calc(100vh - 134px)`}
						style={{
							overflowY: 'scroll',
							overflowX: 'hidden',
						}}
					>
						{freeBoardList.pages.map((freeBoard) =>
							freeBoard.content.map((item) => (
								<div key={item.freeBoardId}>
									<FreeBoardFeedItem feed={item} />
									<Seperation />
								</div>
							)),
						)}
					</InfiniteScroll>
				)}
				{seletedCategory === '사용자' && userList && (
					<StyledUserContainer>
						{userList.map((user) => (
							<StyledUserItem
								key={user.githubId}
								onClick={() => navigation(`/profiles/${user.githubId}`)}
							>
								<img src={user.avatarUrl} alt="" />
								<StyledUserID>{user.githubId}</StyledUserID>
							</StyledUserItem>
						))}
					</StyledUserContainer>
				)}
			</StyledContentList>
		</StyledSearchResultContainer>
	);
};

export default SearchResultPage;

import Header from '@components/common/Header';
import React, { useCallback } from 'react';
import { styled } from 'styled-components';
import { LikedUserListResponse } from '@typedef/common.types';
import { authHttp } from '@utils/http';
import { useLocation, useParams } from 'react-router-dom';
import { findParams } from '@utils/relation';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '@components/common/Loading';
import LikeUserItem from '@components/common/LikeUserItem';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';

// 좋아요 한 사람 페이지 전체 컨테이너
const StyledLikeViewPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	height: 100vh;
`;

// 좋아하는 사람 컨테이너
const StyledLikeUserContainer = styled.div`
	display: flex;
	position: relative;
	flex-direction: row;
	justify-content: space-between;

	width: 100%;
	height: 52px;
	top: 56px;
	margin-bottom: 10px;
`;

// 좋아하는 사람 p 태그
const StyledLikeUserP = styled.div`
	display: flex;
	align-items: center;

	font-size: 18px;
	font-weight: 600;
	margin-left: 20px;
`;

// 좋아요 한 사람 프로필 전체 컨테이너
const StyledUserContainer = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	overflow-y: scroll;

	top: 56px;
	width: 100%;
	height: 100%;

	/* bottom: 70px; */
`;

const LikeViewPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const gitId = useSelector((state: RootState) => state.user.user?.githubId);
	const location = useLocation();
	const curLoction = findParams(location.pathname);
	let curApiLocation = curLoction;
	if (curApiLocation === 'freeboard') {
		curApiLocation = 'freeBoard';
	}
	curApiLocation += 'Id';

	const getLikeList = useCallback(async (page: number) => {
		const res = await authHttp.get<LikedUserListResponse>(
			`${curLoction}/posts/likes?${curApiLocation}=${id}&pages=${page}`,
		);
		return res;
	}, []);

	const {
		data: likeList,
		fetchNextPage,
		hasNextPage,
	} = useInfiniteQuery(
		['/likes', curLoction],
		({ pageParam = 1 }) => getLikeList(pageParam),
		{
			getNextPageParam: (lastPage, allPage) => {
				if (lastPage.last) return;
				return allPage.length + 1;
			},
		},
	);

	return (
		<StyledLikeViewPageContainer>
			<Header title="좋아요" />
			<StyledLikeUserContainer>
				<StyledLikeUserP>좋아하는 사람</StyledLikeUserP>
			</StyledLikeUserContainer>
			<StyledUserContainer>
				{likeList ? (
					<InfiniteScroll
						dataLength={likeList.pages.length}
						next={fetchNextPage}
						hasMore={hasNextPage ? true : false}
						loader={<Loading />}
						height={`calc(100vh - 104.5px)`}
						style={{
							overflowY: 'scroll',
							overflowX: 'hidden',
						}}
					>
						{likeList?.pages.map((users) =>
							users.content.map((user) => {
								if (gitId && user.user.githubId === gitId) return;
								return <LikeUserItem user={user} />;
							}),
						)}
					</InfiniteScroll>
				) : (
					<div>아무도 좋아하지 않습니다.</div>
				)}
			</StyledUserContainer>
		</StyledLikeViewPageContainer>
	);
};

export default LikeViewPage;

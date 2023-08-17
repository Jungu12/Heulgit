import Header from '@components/common/Header';
import { colors } from '@constants/colors';
import React, { useEffect, useCallback } from 'react';
import { styled } from 'styled-components';
import { LikedUserListResponse } from '@typedef/common.types';
import { authHttp } from '@utils/http';
import { useLocation, useParams } from 'react-router-dom';
import { findParams } from '@utils/relation';
import { useInfiniteQuery } from '@tanstack/react-query';

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

// n 명
const StyledLikeUsersCount = styled.div`
	display: flex;
	align-items: center;

	font-size: 14px;
	font-weight: 500;
	color: ${colors.greyScale.grey4};

	margin-right: 20px;
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

// 좋아요 한 사람 프로필 + 버튼 감싸는 컨테이너
const StyledLikeUser = styled.div`
	display: flex;
	position: relative;
	justify-content: space-between;

	height: 72px;

	margin-bottom: 32px;
`;

// 좋아요 한 사람 프로필 컨테이너
const StyledUserProfileContainer = styled.div`
	display: flex;
	flex-direction: row;

	margin-left: 20px;
`;

// 좋아요 한 사람 프로필 이미지
const StyledProfileImg = styled.img`
	display: flex;

	width: 72px;
	height: 72px;

	border-radius: 50%;
	background-color: #000000;
`;

// 좋아요 한 사람 닉네임
const StyledUserName = styled.div`
	display: flex;
	align-items: center;

	margin-left: 20px;

	font-size: 16px;
	font-weight: 600;
`;

// 팔로우 팔로잉 버튼 컨테이너
const StyledFollowButtonContainer = styled.div`
	display: flex;
	position: relative;
	align-items: center;

	margin-right: 20px;
`;

type StyledFollowButtonProps = {
	$following?: boolean;
};

// 팔로우 팔로잉 버튼
const StyledFollowButton = styled.button<StyledFollowButtonProps>`
	align-items: center;

	width: 93px;
	height: 33px;

	border-radius: 8px;

	font-size: 14px;
	font-weight: 600;

	background-color: ${(props) =>
		props.$following ? colors.greyScale.grey3 : colors.primary.primary};
	color: ${(props) => (props.$following ? 'black' : 'white')};
`;

const LikeViewPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const location = useLocation();
	const curLoction = findParams(location.pathname);
	let curApiLocation = curLoction;
	if (curApiLocation === 'freeboard') {
		curApiLocation = 'freeBoard';
		curApiLocation += 'Id';
	}

	const getLikeList = useCallback((page: number) => {
		return authHttp
			.get<LikedUserListResponse>(
				`${curLoction}/posts/likes?${curApiLocation}=${id}&pages=${page}`,
			)
			.then((res) => res);
	}, []);

	const { data: likeList } = useInfiniteQuery(
		['/likes', curLoction],
		({ pageParam = 1 }) => getLikeList(pageParam),
		{
			getNextPageParam: (lastPage, allPage) => {
				if (lastPage.last) return;
				return allPage.length + 1;
			},
		},
	);

	useEffect(() => {
		console.log(id, curLoction);
		console.log(likeList);
	}, [likeList]);

	return (
		<StyledLikeViewPageContainer>
			<Header title="좋아요" />
			<StyledLikeUserContainer>
				<StyledLikeUserP>좋아하는 사람</StyledLikeUserP>
				<StyledLikeUsersCount>{'좋아하는 사람 총 숫자'}</StyledLikeUsersCount>
				<StyledUserContainer>
					{likeList?.pages.map((users) =>
						users.content.map((user) => (
							<StyledLikeUser key={user.user.githubId}>
								<StyledUserProfileContainer>
									<StyledProfileImg src={user.user.avatarUrl} alt="Profile" />
									<StyledUserName>{user.user.githubId}</StyledUserName>
								</StyledUserProfileContainer>
								<StyledFollowButtonContainer>
									<StyledFollowButton $following={user.follow}>
										{user.follow ? '팔로잉' : '팔로우'}
									</StyledFollowButton>
								</StyledFollowButtonContainer>
							</StyledLikeUser>
						)),
					)}
				</StyledUserContainer>
			</StyledLikeUserContainer>
		</StyledLikeViewPageContainer>
	);
};

export default LikeViewPage;

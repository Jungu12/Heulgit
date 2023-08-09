// 유레카 게시물 리스트 보여지는 페이지

import Header from '@components/common/Header';
import { Mobile, PC, Tablet } from '@components/common/MediaQuery';
import CommentInput from '@pages/community/CommentInput';
import EurekaPostCommentList from '@components/community/EurekaPostCommentList';
// import { images } from '@constants/images';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import EurekaPostViewFeedMobile from './EurekaPostViewFeedMobile';
// import EurekaPostViewFeedTabletPC from './EurekaPostViewFeedTabletPC';
// import CommunityMenuBarTablet from '@pages/community/CommunityMenuBarTablet';
import CommunityMenuBarPC from '@pages/community/CommunityMenuBarPC';
// import CommunityFilterTablet from '@pages/community/CommunityFilterTablet';
import CommunityFilterPC from '@pages/community/CommunityFilterPC';
import CommunitySideBarContent from '@pages/community/CommunitySideBarContent';
import Sidebar from '@components/common/Sidebar';
import TabletNavigation from '@components/common/TabletNavigation';
import { useParams } from 'react-router-dom';
import { EurekaPostResponseType } from '@typedef/community/eureka.types';
import { authHttp } from '@utils/http';
import { images } from '@constants/images';

// 커뮤니티 모바일 버전
const CommunityContainerMobile = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	height: 100vh;

	overflow-y: scroll;
	scrollbar-width: none; /* 파이어폭스 */
	/* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
	&::-webkit-scrollbar {
		display: none;
	}
`;
// 모바일 끝

// 유레카 상세페이지 테블릿 버전
const StyledEurekaPostViewTablet = styled.div`
	display: flex;

	justify-content: center;
`;

// 커뮤니티 테블릿 버전
const CommunityContainerTablet = styled.div`
	display: flex;
	flex-direction: column;
	/* align-items: center; */

	max-width: 640px;
	margin-left: 125px;
	height: 100vh;

	overflow-y: scroll;
	scrollbar-width: none; /* 파이어폭스 */
	/* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
	&::-webkit-scrollbar {
		display: none;
	}
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
// 테블릿 끝

// 유레카 상세페이지 PC버전
const StyledEurekaPostViewPC = styled.div`
	display: flex;

	justify-content: space-between;
`;

// 커뮤니티 PC 버전
const CommunityContainerPC = styled.div`
	display: flex;
	flex-direction: column;
	/* align-items: center; */

	width: 520px;
	height: 100vh;

	overflow-y: scroll;
	scrollbar-width: none; /* 파이어폭스 */
	/* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
	&::-webkit-scrollbar {
		display: none;
	}
`;

const EurekaPostViewPage = () => {
	const { id } = useParams();
	const [feed, setFeed] = useState<EurekaPostResponseType>();

	const loadPost = useCallback(() => {
		authHttp.get<EurekaPostResponseType>(`eureka/posts/${id}`).then((res) => {
			setFeed(res);
		});
	}, []);

	useEffect(() => {
		loadPost();
	}, []);

	const [isFilterOpen, setIsFilterOpen] = useState(false);

	const onClickFilter = useCallback(() => {
		setIsFilterOpen(true);
	}, []);

	const onClickClose = useCallback(() => {
		setIsFilterOpen(false);
	}, []);
	return (
		<>
			<Mobile>
				<CommunityContainerMobile>
					<Header title="상세 페이지"></Header>
					<EurekaPostViewFeedMobile feed={feed ?? null} />
					<EurekaPostCommentList comments={feed?.eurekaComments ?? []} />
					<CommentInput />
				</CommunityContainerMobile>
			</Mobile>

			<Tablet>
				<StyledEurekaPostViewTablet>
					<TabletNavigation />
					<CommunityContainerTablet>
						{/* <EurekaPostViewFeedTabletPC feed={dummyPost} />
						<EurekaPostCommentList comments={dummyComment} /> */}
						<CommentInput />
					</CommunityContainerTablet>
					{/* 우측 필터 버튼 */}
					<StyledFilterButton onClick={onClickFilter}>
						<img src={images.filter} alt="filter" />
					</StyledFilterButton>
					<Sidebar open={isFilterOpen}>
						<CommunitySideBarContent onClickClose={onClickClose} />
					</Sidebar>
				</StyledEurekaPostViewTablet>
			</Tablet>

			<PC>
				<StyledEurekaPostViewPC>
					<CommunityMenuBarPC />
					<CommunityContainerPC>
						{/* <EurekaPostViewFeedTabletPC feed={dummyPost} />
						<EurekaPostCommentList comments={dummyComment} /> */}
						<CommentInput />
					</CommunityContainerPC>
					<CommunityFilterPC />
				</StyledEurekaPostViewPC>
			</PC>
		</>
	);
};

export default EurekaPostViewPage;

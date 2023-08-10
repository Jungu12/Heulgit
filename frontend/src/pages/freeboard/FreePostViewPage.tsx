// 자유게시판 게시물 리스트 보여지는 페이지

import Header from '@components/common/Header';
import CommentInput from '@pages/community/CommentInput';
import FreePostCommentList from '@components/community/FreePostCommentList';
import { images } from '@constants/images';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Mobile, PC, Tablet } from '@components/common/MediaQuery';
import FreePostViewFeedMobile from '@pages/freeboard/FreePostViewFeedMobile';
import FreePostViewFeedTabletPC from './FreePostViewFeedTabletPC';
import CommunityMenuBar from '@pages/community/CommunityMenuBarPC';
import CommunityFilterPC from '@pages/community/CommunityFilterPC';
import CommunitySideBarContent from '@pages/community/CommunitySideBarContent';
import Sidebar from '@components/common/Sidebar';
import TabletNavigation from '@components/common/TabletNavigation';

// 더미 상세 게시물
const dummyPost = {
	id: 1,
	title: '일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십',
	user: {
		id: 'jungu12',
		avater_url: images.dummy.dummy1,
	},
	images: [{ file_uri: images.dummy.dummy3 }],
	updated_date: '2023-07-24',
	content:
		'석류랑 민트 소스 들어가 있다길래 신기해서 먹어봤는데 별로더라...양패티 쓰면 민트소스 많이 쓰는건 아는데 석류는 첨 봤거든? 진짜 석류를 간 건지 씨도 막 씹히고 하는데 맛 자체는 잘 모르겠다... 기왕 먹을거면 민트 소스만 먹어 친구들',
	likes: 30,
	views: 20,
	comments: 20,
};

// 더미 댓글
const dummyComment = [
	{
		id: 123,
		user: {
			id: 'jungu121212',
			avater_url: images.dummy.dummy1,
		},
		content: '첫 번째 댓글이지롱',
		updated_date: '38분 전',
		parent_id: 12,
		order: 1,
	},
	{
		id: 1235,
		user: {
			id: 'jungu121212',
			avater_url: images.dummy.dummy1,
		},
		content: '어쩌라고',
		updated_date: '38분 전',
		parent_id: 12,
		order: 1,
	},
	{
		id: 1234,
		user: {
			id: 'jungu121212',
			avater_url: images.dummy.dummy1,
		},
		content: '집에 보내줘~~!~!~!!!',
		updated_date: '38분 전',
		parent_id: 12,
	},
	{
		id: 1234,
		user: {
			id: 'jungu121212',
			avater_url: images.dummy.dummy1,
		},
		content: '으핰핰 오늘 지각했지롱',
		updated_date: '38분 전',
		parent_id: 12,
	},
	{
		id: 12355,
		user: {
			id: 'jungu121212',
			avater_url: images.dummy.dummy1,
		},
		content: '보통 오류가 아닙니다 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
		updated_date: '38분 전',
		parent_id: 12,
	},
];

// 커뮤니티
const CommunityContainerMobile = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	overflow-y: scroll;
	scrollbar-width: none; /* 파이어폭스 */
	/* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
	&::-webkit-scrollbar {
		display: none;
	}
`;

// 자유게시판 상세페이지 테블릿 버전
const StyledFreeBoardPostViewTablet = styled.div`
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

// 상세페이지 PC버전
const StyledFreeBoardPostViewPC = styled.div`
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

const FreePostViewPage = () => {
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
					<FreePostViewFeedMobile feed={dummyPost} />
					<FreePostCommentList comments={dummyComment} />
					<CommentInput />
				</CommunityContainerMobile>
			</Mobile>

			<Tablet>
				<StyledFreeBoardPostViewTablet>
					<TabletNavigation />
					<CommunityContainerTablet>
						<FreePostViewFeedTabletPC feed={dummyPost} />
						<FreePostCommentList comments={dummyComment} />
						<CommentInput />
					</CommunityContainerTablet>
					{/* 우측 필터 버튼 */}
					<StyledFilterButton onClick={onClickFilter}>
						<img src={images.filter} alt="filter" />
					</StyledFilterButton>
					<Sidebar open={isFilterOpen}>
						<CommunitySideBarContent onClickClose={onClickClose} />
					</Sidebar>
				</StyledFreeBoardPostViewTablet>
			</Tablet>

			<PC>
				<StyledFreeBoardPostViewPC>
					<CommunityMenuBar />
					<CommunityContainerPC>
						<FreePostViewFeedTabletPC feed={dummyPost} />
						<FreePostCommentList comments={dummyComment} />
						<CommentInput />
					</CommunityContainerPC>
					<CommunityFilterPC />
				</StyledFreeBoardPostViewPC>
			</PC>
		</>
	);
};

export default FreePostViewPage;

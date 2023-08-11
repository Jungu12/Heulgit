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
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { EurekaPostResponseType } from '@typedef/community/eureka.types';
import { RootState } from '@store/index';
import { authHttp } from '@utils/http';

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
	const navigation = useNavigate();
	const { id } = useParams(); // 유저 id
	const [isFilterOpen, setIsFilterOpen] = useState(false); // 필터
	const userId = useSelector((state: RootState) => state.user.user?.githubId); // 리덕스 문법..?
	const [feed, setFeed] = useState<EurekaPostResponseType>(); // 불러온 피드 리스트
	const [isMenuOpen, setIsMenuOpen] = useState(false); // 수정, 삭제, 닫기 메뉴 버튼

	// 포스트 불러오기
	const loadPost = useCallback(() => {
		authHttp.get<EurekaPostResponseType>(`eureka/posts/${id}`).then((res) => {
			setFeed(res);
		});
	}, []);

	// 필터 여는 함수
	const onClickFilter = useCallback(() => {
		setIsFilterOpen(true);
	}, []);

	// 필터 닫는 함수
	const onClickClose = useCallback(() => {
		setIsFilterOpen(false);
	}, []);

	// 메뉴버튼 여는 함수
	const onClickMenu = useCallback(() => {
		setIsMenuOpen(true);
	}, []);

	// 메뉴버튼 닫는 함수
	const onClickMenuClose = useCallback(() => {
		setIsMenuOpen(false);
	}, []);

	// 수정 함수
	const onClickEdit = useCallback(() => {
		navigation(`/community/eureka/${id}/edit`);
	}, []);

	// 삭제 함수
	const onClickDelete = useCallback(() => {
		if (confirm('정말 삭제하시겠습니까?')) {
			authHttp.delete(`eureka/posts/${id}`).then(() => {
				navigation('/community/eureka');
			});
		}
	}, []);

	return (
		<>
			<Mobile>
				<CommunityContainerMobile>
					<Header title="상세 페이지"></Header>
					{/* <FreePostViewFeedMobile
						feed={feed ?? null}
						userId={userId!}
						isMenuOpen={isMenuOpen}
						onClickMenu={onClickMenu}
						onClickDelete={onClickDelete}
						onClickMenuClose={onClickMenuClose}
						onClickEdit={onClickEdit}
					/> */}
					{/* <FreePostCommentList comments={feed?.eurekaComments ?? []} /> */}
					<CommentInput />
				</CommunityContainerMobile>
			</Mobile>

			<Tablet>
				<StyledFreeBoardPostViewTablet>
					<TabletNavigation />
					<CommunityContainerTablet>
						{/* <FreePostViewFeedTabletPC feed={dummyPost} />
						<FreePostCommentList comments={dummyComment} /> */}
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
						{/* <FreePostViewFeedTabletPC feed={dummyPost} />
						<FreePostCommentList comments={dummyComment} /> */}
						<CommentInput />
					</CommunityContainerPC>
					<CommunityFilterPC />
				</StyledFreeBoardPostViewPC>
			</PC>
		</>
	);
};

export default FreePostViewPage;

// 유레카 게시물 리스트 보여지는 페이지

import Header from '@components/common/Header';
import { Mobile, PC, Tablet } from '@components/common/MediaQuery';
import CommentInput from '@pages/community/CommentInput';
import EurekaPostCommentList from '@components/community/EurekaPostCommentList';
import { images } from '@constants/images';
import React from 'react';
import styled from 'styled-components';
import EurekaPostViewFeedMobile from './EurekaPostViewFeedMobile';
import EurekaPostViewFeedTabletPC from './EurekaPostViewFeedTabletPC';
import { colors } from '@constants/colors';
import CommunityFilter from '@pages/community/CommunityFilterPC';
import CommunityMenuBar from '@pages/community/CommunityMenuBarPC';
import CommunityMenuBarTablet from '@pages/community/CommunityMenuBarTablet';
import CommunityMenuBarPC from '@pages/community/CommunityMenuBarPC';
import CommunityFilterTablet from '@pages/community/CommunityFilterTablet';
import CommunityFilterPC from '@pages/community/CommunityFilterPC';

// 더미 상세 게시물
const dummyPost = {
	id: 1,
	title: '유레카유레카유레카유레카유레카유레카유레카유레카유레카유레카',
	link: 'https://documenter.getpostman.com/view/13967981/2s946h8Y2g#16996026-070b-4757-9300-8c54ee73ae1a',
	user: {
		id: 'jungu12',
		avater_url: images.dummy.dummy1,
	},
	images: [{ file_uri: images.dummy.dummy4 }],
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
		order: 1,
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
		order: 1,
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
		order: 1,
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
		order: 1,
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
		order: 1,
	},
];

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

	justify-content: space-between;
`;

// 커뮤니티 테블릿 버전
const CommunityContainerTablet = styled.div`
	display: flex;
	flex-direction: column;
	/* align-items: center; */

	width: 520px; /* 태블릿 최소 768 - 양 옆 메뉴바들 124*2 = 520px */
	height: 100vh;

	overflow-y: scroll;
	scrollbar-width: none; /* 파이어폭스 */
	/* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
	&::-webkit-scrollbar {
		display: none;
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
	return (
		<>
			<Mobile>
				<CommunityContainerMobile>
					<Header title="상세 페이지"></Header>
					<EurekaPostViewFeedMobile feed={dummyPost} />
					<EurekaPostCommentList comments={dummyComment} />
					<CommentInput />
				</CommunityContainerMobile>
			</Mobile>

			<Tablet>
				<StyledEurekaPostViewTablet>
					<CommunityMenuBarTablet />
					<CommunityContainerTablet>
						<EurekaPostViewFeedTabletPC feed={dummyPost} />
						<EurekaPostCommentList comments={dummyComment} />
						<CommentInput />
					</CommunityContainerTablet>
					<CommunityFilterTablet />
				</StyledEurekaPostViewTablet>
			</Tablet>

			<PC>
				<StyledEurekaPostViewPC>
					<CommunityMenuBarPC />
					<CommunityContainerPC>
						<EurekaPostViewFeedTabletPC feed={dummyPost} />
						<EurekaPostCommentList comments={dummyComment} />
						<CommentInput />
					</CommunityContainerPC>
					<CommunityFilterPC />
				</StyledEurekaPostViewPC>
			</PC>
		</>
	);
};

export default EurekaPostViewPage;

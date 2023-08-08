// 유레카 게시물 리스트 보여지는 페이지

import Header from '@components/common/Header';
import { Mobile, PC, Tablet } from '@components/common/MediaQuery';
import CommentInput from '@pages/community/CommentInput';
// import EurekaPostCommentList from '@components/community/EurekaPostCommentList';
// import { images } from '@constants/images';
import React from 'react';
import styled from 'styled-components';
// import EurekaPostViewFeedMobile from './EurekaPostViewFeedMobile';
// import EurekaPostViewFeedTabletPC from './EurekaPostViewFeedTabletPC';
import CommunityMenuBarTablet from '@pages/community/CommunityMenuBarTablet';
import CommunityMenuBarPC from '@pages/community/CommunityMenuBarPC';
import CommunityFilterTablet from '@pages/community/CommunityFilterTablet';
import CommunityFilterPC from '@pages/community/CommunityFilterPC';

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
					{/* <EurekaPostViewFeedMobile feed={dummyPost} />
					<EurekaPostCommentList comments={dummyComment} /> */}
					<CommentInput />
				</CommunityContainerMobile>
			</Mobile>

			<Tablet>
				<StyledEurekaPostViewTablet>
					<CommunityMenuBarTablet />
					<CommunityContainerTablet>
						{/* <EurekaPostViewFeedTabletPC feed={dummyPost} />
						<EurekaPostCommentList comments={dummyComment} /> */}
						<CommentInput />
					</CommunityContainerTablet>
					<CommunityFilterTablet />
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

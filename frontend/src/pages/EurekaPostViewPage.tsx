import Header from '@components/common/Header';
import CommentInput from '@components/community/CommentInput';
import FeedBottom from '@components/community/FeedBottom';
import FeedComment from '@components/community/FeedComment';
import TitleContainer from '@components/community/TitleContainer';
import { colors } from '@constants/colors';
import React from 'react';
import styled from 'styled-components';

// 커뮤니티
const CommunityContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow-y: scroll;

	height: 100vh;
`;

// 피드
const Feed = styled.div`
	display: flex;
	position: relative;
	justify-content: center;

	/* height: 300px; */
	width: 100%;
	min-height: 300px; /* 스크롤이 가능하도록 min-height로 변경 */
	border: solid 1px ${colors.greyScale.grey4};
`;

const FreePostViewPage = () => {
	return (
		<CommunityContainer>
			<Header title="상세 페이지"></Header>
			<TitleContainer />
			<Feed>이 개그튼 피드 댓글에는 등록버튼 달기....</Feed>
			<FeedBottom showCommentIcon={false} /> {/* 여기서 댓글 아이콘 숨김 */}
			<FeedComment />
			<CommentInput />
		</CommunityContainer>
	);
};

export default FreePostViewPage;

// import { colors } from '@constants/colors';
import React from 'react';
import { styled } from 'styled-components';

const StyledFeedCommentContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow-y: scroll;

	/* width: 100%; // 컨테이너에서는 꼭 빼기 */
`;

// const StyledCommentDiv = styled.div`
// 	/* width: 100%; */
// 	margin-left: 30px;
// 	margin-top: 20px;
// `;

const FeedComment = () => {
	return <StyledFeedCommentContainer />;
};

export default FeedComment;

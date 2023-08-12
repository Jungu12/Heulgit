import React from 'react';
import { styled } from 'styled-components';
import { colors } from '@constants/colors';
import { FreeBoardCommentType } from '@typedef/community/freeboard.types';
import FreePostComment from './FreePostComment';

const StyledCommentListContainer = styled.div`
	display: flex;
	flex-direction: column;

	width: 100%;
	margin-bottom: 50px;
`;

// 분리 선
const Separation = styled.div`
	background-color: ${colors.greyScale.grey3};
	width: 100%;
	height: 1px;
	margin-top: 20px;
`;

type Props = {
	comments: FreeBoardCommentType[];
};

const FreePostCommentList = ({ comments }: Props) => {
	return (
		<StyledCommentListContainer>
			{comments.map((comment) => (
				<>
					<FreePostComment comment={comment} key={comment.commentId} />
					<Separation />
				</>
			))}
		</StyledCommentListContainer>
	);
};

export default FreePostCommentList;

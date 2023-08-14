import React from 'react';
import { styled } from 'styled-components';
import { colors } from '@constants/colors';
import { EurekaCommentType } from '@typedef/community/eureka.types';
// import Comment from '@components/Home/Comment';

const StyledCommentListContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const Separation = styled.div`
	background-color: ${colors.greyScale.grey3};
	width: 100%;
	height: 1px;
	margin-top: 20px;
`;

type EurekaProps = {
	eurekaComments: EurekaCommentType[];
};

const PostViewComment = ({ eurekaComments }: EurekaProps) => {
	return (
		<StyledCommentListContainer>
			{eurekaComments.map((comment) => (
				<div key={comment.commentId}>
					{/* <Comment comment={comment} /> */}
					<Separation />
				</div>
			))}
		</StyledCommentListContainer>
	);
};

export default PostViewComment;

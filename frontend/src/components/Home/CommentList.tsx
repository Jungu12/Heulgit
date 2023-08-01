import { HeulGitCommentType } from '@typedef/home/heulgit.types';
import React from 'react';
import { styled } from 'styled-components';
import Comment from './Comment';
import { colors } from '@constants/colors';

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

type Props = {
	comments: HeulGitCommentType[];
};

const CommentList = ({ comments }: Props) => {
	return (
		<StyledCommentListContainer>
			{comments.map((comment) => (
				<>
					<Comment comment={comment} key={comment.id} />
					<Separation />
				</>
			))}
		</StyledCommentListContainer>
	);
};

export default CommentList;

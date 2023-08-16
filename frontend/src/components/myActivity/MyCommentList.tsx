import { HeulGitCommentType } from '@typedef/home/heulgit.types';
import React from 'react';
import { styled } from 'styled-components';
import MyComment from './MyComment';
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

const MyCommentList = ({ comments }: Props) => {
	return (
		<StyledCommentListContainer>
			{comments.map((comment) => (
				<>
					<MyComment comment={comment} key={comment.commentId} />
					<Separation />
				</>
			))}
		</StyledCommentListContainer>
	);
};

export default MyCommentList;

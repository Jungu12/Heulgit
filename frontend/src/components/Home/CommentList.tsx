import { HeulGitCommentType } from '@typedef/home/heulgit.types';
import React from 'react';
import { styled } from 'styled-components';
import Comment from './Comment';
import { colors } from '@constants/colors';
import CommentInput from './CommentInput';
import { OnChangeHandlerFunc } from 'react-mentions';

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
	onClickSubbmit: () => Promise<void>;
	handleInputChange: OnChangeHandlerFunc;
	onClickCommentMenuOpen: (commentId: number) => void;
	input: string;
};

const CommentList = ({
	comments,
	onClickSubbmit,
	handleInputChange,
	onClickCommentMenuOpen,
	input,
}: Props) => {
	return (
		<StyledCommentListContainer>
			{comments.map((comment) => (
				<>
					<Comment
						comment={comment}
						key={comment.commentId}
						onClickCommentMenuOpen={onClickCommentMenuOpen}
						type={'detail'}
					/>
					<Separation />
				</>
			))}
			{/* 댓글 입력창 */}
			<CommentInput
				onClickSubbmit={onClickSubbmit}
				input={input}
				onHandleComment={handleInputChange}
			/>
		</StyledCommentListContainer>
	);
};

export default CommentList;

import { colors } from '@constants/colors';
import React from 'react';
import { styled } from 'styled-components';
import Comment from './Comment';
import { HeulGitCommentType } from '@typedef/home/heulgit.types';

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

const StyledCommentEmpty = styled.div`
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: center;
	font-size: 16px;
	font-weight: 700;
`;

type Props = {
	postId: number;
	commentList: HeulGitCommentType[];
};

// 받은 postId로 댓글 생성해서 넘기기
const CommentListBottomSheet = ({ postId, commentList }: Props) => {
	console.log(postId, commentList);

	return (
		<StyledCommentListContainer>
			{commentList ? (
				commentList.map((comment) => (
					<>
						<Comment
							comment={comment}
							key={comment.commentId}
							// onClickCommentMenuOpen 수정해야함
							onClickCommentMenuOpen={function (commentId: number): void {
								console.log(commentId);
								throw new Error('Function not implemented.');
							}}
						/>
						<Separation />
					</>
				))
			) : (
				<StyledCommentEmpty>아직 댓글이 없습니다.</StyledCommentEmpty>
			)}
		</StyledCommentListContainer>
	);
};

export default CommentListBottomSheet;

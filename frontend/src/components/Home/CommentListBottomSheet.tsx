import { colors } from '@constants/colors';
import { images } from '@constants/images';
import React from 'react';
import { styled } from 'styled-components';
import Comment from './Comment';

// 더미 댓글
const dummyComment = [
	{
		id: 123,
		user: {
			id: 'jungu121212',
			avater_url: images.dummy.dummy1,
		},
		content: '@jungu12 이거 참고해',
		updated_date: '36분 전',
		parent_id: 12,
		order: 1,
	},
	{
		id: 123,
		user: {
			id: 'jungu121212',
			avater_url: images.dummy.dummy1,
		},
		content: '@jungu12 싫엉',
		updated_date: '38분 전',
		parent_id: 12,
		order: 1,
	},
];

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
	postId: number;
};

// 받은 postId로 댓글 생성해서 넘기기
const CommentListBottomSheet = ({ postId }: Props) => {
	console.log(postId);

	return (
		<StyledCommentListContainer>
			{dummyComment.map((comment) => (
				<>
					<Comment comment={comment} key={comment.id} />
					<Separation />
				</>
			))}
		</StyledCommentListContainer>
	);
};

export default CommentListBottomSheet;

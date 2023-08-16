import { colors } from '@constants/colors';
import React from 'react';
import { styled } from 'styled-components';
import { FreeBoardCommentType } from '@typedef/community/freeboard.types';
import FreeBoardComment from './FreeBoardComment';

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
	font-size: 20px;
	font-weight: 700;
	margin: 50% 0 32px 0;
`;

type Props = {
	commentList: FreeBoardCommentType[];
	onClickDelete: (commentId: number) => void;
};

const FreeBoardCommentList = ({ commentList, onClickDelete }: Props) => {
	return (
		<StyledCommentListContainer>
			{commentList.length ? (
				commentList.map((comment) => (
					<div key={comment.commentId}>
						<FreeBoardComment comment={comment} onClickDelete={onClickDelete} />
						<Separation />
					</div>
				))
			) : (
				<StyledCommentEmpty>아직 댓글이 없습니다.</StyledCommentEmpty>
			)}
		</StyledCommentListContainer>
	);
};

export default FreeBoardCommentList;

import React from 'react';
import { styled } from 'styled-components';
import { colors } from '@constants/colors';
import { FreeBoardCommentType } from '@typedef/community/freeboard.types';
import FreePostComment from './FreePostComment';

const StyledCommentListContainer = styled.div`
	display: flex;
	flex-direction: column;

	width: 100%;
	margin-bottom: 60px;
`;

// 분리 선
const Separation = styled.div`
	background-color: ${colors.greyScale.grey3};
	width: 100%;
	height: 1px;
	margin-top: 20px;
`;

type Props = {
	commentList: FreeBoardCommentType[];
	onClickCommentMenuOpen: (id: number) => void;
};

const FreePostCommentList = ({
	commentList,
	onClickCommentMenuOpen,
}: Props) => {
	return (
		<StyledCommentListContainer>
			{commentList.map((comment) => (
				<div key={comment.commentId}>
					<FreePostComment
						comment={comment}
						onClickCommentMenuOpen={onClickCommentMenuOpen}
					/>
					<Separation />
				</div>
			))}
		</StyledCommentListContainer>
	);
};

export default FreePostCommentList;

import React from 'react';
import { styled } from 'styled-components';
import { colors } from '@constants/colors';
import { EurekaCommentType } from '@typedef/community/eureka.types';
import EurekaPostComment from './EurekaPostComment';

const StyledCommentListContainer = styled.div`
	display: flex;
	flex-direction: column;

	width: 100%;
	margin-bottom: 6px;
`;

// 분리 선
const Separation = styled.div`
	background-color: ${colors.greyScale.grey3};
	width: 100%;
	height: 1px;
	margin-top: 10px;
`;

type Props = {
	comments: EurekaCommentType[];
	onClickCommentMenuOpen: (id: number) => void;
};

const EurekaPostCommentList = ({ comments, onClickCommentMenuOpen }: Props) => {
	return (
		<StyledCommentListContainer>
			{comments.map((comment) => (
				<>
					<EurekaPostComment
						comment={comment}
						key={comment.commentId}
						onClickCommentMenuOpen={onClickCommentMenuOpen}
					/>
					<Separation />
				</>
			))}
		</StyledCommentListContainer>
	);
};

export default EurekaPostCommentList;

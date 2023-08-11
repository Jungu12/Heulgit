import { colors } from '@constants/colors';
import { EurekaCommentType } from '@typedef/community/eureka.types';
import React from 'react';
import { styled } from 'styled-components';
import EurekaComment from './EurekaComment';

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
	commentList: EurekaCommentType[];
	onClickDelete: (commentId: number) => void;
};

const EurekaCommentList = ({ commentList, onClickDelete }: Props) => {
	return (
		<StyledCommentListContainer>
			{commentList.map((comment) => (
				<div key={comment.commentId}>
					<EurekaComment comment={comment} onClickDelete={onClickDelete} />
					<Separation />
				</div>
			))}
		</StyledCommentListContainer>
	);
};

export default EurekaCommentList;

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

const StyledCommentEmpty = styled.div`
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: center;
	font-size: 16px;
	font-weight: 700;
`;

type Props = {
	commentList: EurekaCommentType[];
	onClickDelete: (commentId: number) => void;
};

const EurekaCommentList = ({ commentList, onClickDelete }: Props) => {
	return (
		<StyledCommentListContainer>
			{commentList.length ? (
				commentList.map((comment) => (
					<div key={comment.commentId}>
						<EurekaComment comment={comment} onClickDelete={onClickDelete} />
						<Separation />
					</div>
				))
			) : (
				<StyledCommentEmpty>아직 댓글이 없습니다.</StyledCommentEmpty>
			)}
		</StyledCommentListContainer>
	);
};

export default EurekaCommentList;

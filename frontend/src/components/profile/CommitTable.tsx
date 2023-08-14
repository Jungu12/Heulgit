// CommitTable.tsx
import React, { useState } from 'react';
import { styled } from 'styled-components';
import { colors } from '@constants/colors';
import CommitTableItem from './CommitTableItem';

// 전체
const StyledCommitTable = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 20px;
`;
// 한 줄
const StyledWrap = styled.div`
	display: flex;
	justify-content: space-around;
	border-bottom: 1px solid ${colors.greyScale.grey3};
	padding: 10px;
	font-weight: 500;
`;
const StyledTag = styled.div`
	display: flex;
	justify-content: center;
	width: 50%;
`;
const StyledCount = styled.div`
	display: flex;
	justify-content: center;
	width: 50%;
`;
const StyledButton = styled.button`
	padding: 10px;
	background-color: transparent;
	cursor: pointer;
`;

type CommitTag = {
	type: string;
	count: number;
};
type Props = {
	commitTag: CommitTag[];
};

const CommitTable = ({ commitTag }: Props) => {
	const [showAll, setShowAll] = useState(false);

	return (
		<StyledCommitTable>
			<StyledWrap>
				<StyledTag>태그</StyledTag>
				<StyledCount>횟수</StyledCount>
			</StyledWrap>
			{commitTag.slice(0, showAll ? commitTag.length : 5).map((tag, index) => (
				<CommitTableItem key={index} tag={tag} />
			))}
			{commitTag.length > 5 && (
				<StyledButton onClick={() => setShowAll(!showAll)}>
					{showAll ? '접기' : '더보기'}
				</StyledButton>
			)}
		</StyledCommitTable>
	);
};

export default CommitTable;

// CommitTable.tsx
import React from 'react';
import { styled } from 'styled-components';
import { colors } from '@constants/colors';
import CommitTableItem from './CommitTableItem';

const StyledCommitTable = styled.div`
	width: 80vw;
	width: 80vw;
	margin-bottom: 15px;
`;
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
type CommitTag = {
	type: string;
	count: number;
};

type Props = {
	commitTag: CommitTag[];
};

const CommitTable = ({ commitTag }: Props) => {
	return (
		<StyledCommitTable>
			<StyledWrap>
				<StyledTag>태그</StyledTag>
				<StyledCount>횟수</StyledCount>
			</StyledWrap>
			{commitTag.map((tag, index) => (
				<CommitTableItem key={index} tag={tag} />
			))}
			<map name=""></map>
		</StyledCommitTable>
	);
};

export default CommitTable;
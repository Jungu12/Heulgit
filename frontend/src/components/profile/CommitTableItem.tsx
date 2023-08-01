// CommitTableItem.tsx
import React from 'react';
import { styled } from 'styled-components';
import { colors } from '@constants/colors';

const StyledWrap = styled.div`
	display: flex;
	align-content: center;
	justify-content: space-around;
	border-bottom: 1px solid ${colors.greyScale.grey3};
	padding: 10px 50px;
`;
const StyledTag = styled.div`
	width: 50vw;
`;
const StyledCount = styled.div`
	width: 10vw;
`;

type CommitTag = {
	type: string;
	count: number;
};

type Props = {
	tag: CommitTag;
};

const CommitTableItem: React.FC<Props> = ({ tag }) => {
	return (
		<StyledWrap>
			<StyledTag>{tag.type}</StyledTag>
			<StyledCount>{tag.count}</StyledCount>
		</StyledWrap>
	);
};

export default CommitTableItem;
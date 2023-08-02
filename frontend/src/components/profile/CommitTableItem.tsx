import React from 'react';
import { styled } from 'styled-components';
import { colors } from '@constants/colors';

const StyledWrap = styled.div`
	display: flex;
	justify-content: space-around;
	border-bottom: 1px solid ${colors.greyScale.grey3};
	padding: 10px;
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
	tag: CommitTag;
};

const CommitTableItem = ({ tag }: Props) => {
	return (
		<StyledWrap>
			<StyledTag>{tag.type}</StyledTag>
			<StyledCount>{tag.count}</StyledCount>
		</StyledWrap>
	);
};

export default CommitTableItem;

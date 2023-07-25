import { colors } from '@constants/colors';
import React from 'react';
import { styled } from 'styled-components';

const StyledFilterContainder = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	height: 53px;
	border-bottom: solid 2px ${colors.greyScale.grey3};
`;

const StyledFilterButton = styled.button`
	color: ${colors.greyScale.grey4};
	font-size: 11px;
	font-weight: bold;

	padding: 0;
	width: 88px;
	height: 28px;
	border: solid 1px ${colors.greyScale.grey4};
	border-radius: 36px;
	background-color: white;
`;

const FilterCategory = () => {
	return (
		<StyledFilterContainder>
			<StyledFilterButton>전체 보기</StyledFilterButton>
			<StyledFilterButton>좋아요 많은 순</StyledFilterButton>
			<StyledFilterButton>스타 많은 순</StyledFilterButton>
			<StyledFilterButton>조회 순</StyledFilterButton>
		</StyledFilterContainder>
	);
};

export default FilterCategory;

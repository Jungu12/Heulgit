import { colors } from '@constants/colors';
import React from 'react';
import styled from 'styled-components';

const StyledCategoryContainer = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	height: 53px;
	margin-top: 55px;

	border-bottom: solid 2px ${colors.greyScale.grey3};
`;

const StyledCategoryButton = styled.button`
	font-weight: bolder;
	font-size: 14px;

	background-color: transparent;
	border: none;
	width: 100%;
	height: 100%;

	padding: 0;
`;

const CommunityCategory = () => {
	return (
		<StyledCategoryContainer>
			<StyledCategoryButton>유레카</StyledCategoryButton>
			<StyledCategoryButton>자유게시판</StyledCategoryButton>
		</StyledCategoryContainer>
	);
};

export default CommunityCategory;

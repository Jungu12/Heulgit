import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { colors } from '@constants/colors';

const StyledCategory = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: end;
	height: 50px;
	border-bottom: 2px solid ${colors.greyScale.grey2};
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

type CategoryProps = {
	menu1: string;
	menuRouter1: () => void;
	menu2: string;
	menuRouter2: () => void;
	menu3?: string;
	menuRouter3?: () => void;
};

const Category: React.FC<CategoryProps> = ({
	menu1,
	menuRouter1,
	menu2,
	menuRouter2,
	menu3,
	menuRouter3,
}) => {
	return (
		<StyledCategory>
			<StyledCategoryButton onClick={menuRouter1}>{menu1}</StyledCategoryButton>
			<StyledCategoryButton onClick={menuRouter2}>{menu2}</StyledCategoryButton>
			<StyledCategoryButton onClick={menuRouter3}>{menu3}</StyledCategoryButton>
		</StyledCategory>
	);
};

export default Category;

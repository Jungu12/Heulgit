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

type Props = {
	menu1: string;
	menu2: string;
	menu3?: string;
	menuRouter1: string;
	menuRouter2: string;
	menuRouter3?: string;
	onClickCategoryButton?: () => void;
};

const Category = ({
	menu1,
	menu2,
	menu3,
	menuRouter1,
	menuRouter2,
	menuRouter3 = '',
	onClickCategoryButton,
}: Props) => {
	const navigation = useNavigate();

	const handleMenuClick = (menuRouter: string) => {
		if (onClickCategoryButton) {
			onClickCategoryButton();
		} else {
			navigation(menuRouter);
		}
	};

	return (
		<StyledCategory>
			<StyledCategoryButton onClick={() => handleMenuClick(menuRouter1)}>
				{menu1}
			</StyledCategoryButton>
			<StyledCategoryButton onClick={() => handleMenuClick(menuRouter2)}>
				{menu2}
			</StyledCategoryButton>
			{menu3 && (
				<StyledCategoryButton onClick={() => handleMenuClick(menuRouter3)}>
					{menu3}
				</StyledCategoryButton>
			)}
		</StyledCategory>
	);
};

export default Category;

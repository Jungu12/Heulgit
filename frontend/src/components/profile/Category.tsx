import React from 'react';
import { styled } from 'styled-components';
import { colors } from '@constants/colors';

const StyledCategory = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: end;
	height: 50px;
`;

const StyledCategoryButton = styled.button`
	font-weight: bolder;
	font-size: 14px;
	background-color: transparent;
	border: none;
	width: 100%;
	height: 100%;
	padding: 0;
	border-bottom: 2px solid ${colors.greyScale.grey2};
`;

const SelectedCategoryButton = styled(StyledCategoryButton)`
	border-bottom: 2px solid ${colors.primary.primary};
`;

type CategoryProps = {
	menu1: string;
	menuRouter1: () => void;
	menu2: string;
	menuRouter2: () => void;
	menu3?: string;
	menuRouter3?: () => void;
	selectedMenu: string; // 선택된 메뉴 이름을 전달받는 속성
};

const Category = ({
	menu1,
	menuRouter1,
	menu2,
	menuRouter2,
	menu3,
	menuRouter3,
	selectedMenu, // 선택된 메뉴 이름을 전달받는 속성
}: CategoryProps) => {
	return (
		<StyledCategory>
			{selectedMenu === menu1 ? (
				<SelectedCategoryButton onClick={menuRouter1}>
					{menu1}
				</SelectedCategoryButton>
			) : (
				<StyledCategoryButton onClick={menuRouter1}>
					{menu1}
				</StyledCategoryButton>
			)}
			{selectedMenu === menu2 ? (
				<SelectedCategoryButton onClick={menuRouter2}>
					{menu2}
				</SelectedCategoryButton>
			) : (
				<StyledCategoryButton onClick={menuRouter2}>
					{menu2}
				</StyledCategoryButton>
			)}
			{menu3 && (
				<>
					{selectedMenu === menu3 ? (
						<SelectedCategoryButton onClick={menuRouter3}>
							{menu3}
						</SelectedCategoryButton>
					) : (
						<StyledCategoryButton onClick={menuRouter3}>
							{menu3}
						</StyledCategoryButton>
					)}
				</>
			)}
		</StyledCategory>
	);
};

export default Category;

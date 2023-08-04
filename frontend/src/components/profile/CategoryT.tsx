import React from 'react';
import { styled } from 'styled-components';
// import { colors } from '@constants/colors';

const StyledCategory = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: start;
`;

const StyledCategoryButton = styled.button`
	display: flex;
	flex-direction: column;
	width: 100%;
	font-size: 20px;
	background-color: transparent;
	padding: 15px 0;
`;

const SelectedCategoryButton = styled(StyledCategoryButton)`
	font-weight: bold;
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

import React from 'react';
import { styled } from 'styled-components';
import { colors } from '@constants/colors';

type StyledCategoryProps = {
	$hasIcon: boolean;
};

const StyledCategoryWrapper = styled.div<StyledCategoryProps>`
	/* display: flex; */
	/* justify-content: space-around; */
	/* align-items: end; */
	height: ${(props) => (props.$hasIcon ? '60px' : '50px')};
`;

const StyledCategory = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: end;
`;

const StyledCategoryButton = styled.button`
	font-weight: bolder;
	font-size: 14px;
	color: ${colors.greyScale.grey4};
	background-color: transparent;
	border: none;
	width: 100%;
	height: 100%;
	padding: 15px;
	border-bottom: 2px solid ${colors.greyScale.grey3};

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: end;

	img {
		width: auto;
		height: 30px;
		margin: 5px;
	}
`;

const SelectedCategoryButton = styled(StyledCategoryButton)`
	border-bottom: 2px solid ${colors.primary.primary};
	color: ${colors.primary.primary};
`;

const StyledIcon = styled.img`
	width: 16px;
	height: 16px;
	margin-right: 8px;
`;

type CategoryProps = {
	menu1: string;
	icon11?: string;
	icon12?: string;
	menuRouter1: () => void;
	menu2: string;
	icon21?: string;
	icon22?: string;
	menuRouter2: () => void;
	menu3?: string;
	icon31?: string;
	icon32?: string;
	menuRouter3?: () => void;
	selectedMenu: string;
};

const Category = ({
	menu1,
	icon11,
	icon12,
	menuRouter1,
	menu2,
	icon21,
	icon22,
	menuRouter2,
	menu3,
	icon31,
	icon32,
	menuRouter3,
	selectedMenu,
}: CategoryProps) => {
	const $hasIcon = icon11 || icon12 || icon21 || icon22 || icon31 || icon32;

	return (
		<StyledCategoryWrapper $hasIcon={!!$hasIcon}>
			<StyledCategory>
				{selectedMenu === menu1 ? (
					<SelectedCategoryButton onClick={menuRouter1}>
						{icon11 && <StyledIcon src={icon11} />} {menu1}
					</SelectedCategoryButton>
				) : (
					<StyledCategoryButton onClick={menuRouter1}>
						{icon12 && <StyledIcon src={icon12} />}
						{menu1}
					</StyledCategoryButton>
				)}
				{selectedMenu === menu2 ? (
					<SelectedCategoryButton onClick={menuRouter2}>
						{icon21 && <StyledIcon src={icon21} />} {menu2}
					</SelectedCategoryButton>
				) : (
					<StyledCategoryButton onClick={menuRouter2}>
						{icon22 && <StyledIcon src={icon22} />}
						{menu2}
					</StyledCategoryButton>
				)}
				{menu3 && (
					<>
						{selectedMenu === menu3 ? (
							<SelectedCategoryButton onClick={menuRouter3}>
								{icon31 && <StyledIcon src={icon31} />} {menu3}
							</SelectedCategoryButton>
						) : (
							<StyledCategoryButton onClick={menuRouter3}>
								{icon32 && <StyledIcon src={icon32} />}
								{menu3}
							</StyledCategoryButton>
						)}
					</>
				)}
			</StyledCategory>
		</StyledCategoryWrapper>
	);
};

export default Category;

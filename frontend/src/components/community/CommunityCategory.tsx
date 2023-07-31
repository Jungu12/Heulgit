import { colors } from '@constants/colors';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// 커뮤니티 선택 컨테이너
const StyledCategoryContainer = styled.div`
	display: flex;
	position: fixed;
	justify-content: space-around;
	align-items: center;
	z-index: 99;

	width: 100%;

	height: 53px;
	top: 55px;

	background-color: #ffffff;
`;

// 커뮤니티 선택 버튼
const StyledCategoryButton = styled.button<{ $active: boolean }>`
	font-weight: bolder;
	font-size: 14px;

	background-color: transparent;
	border: none;
	border-bottom: solid 2px
		${({ $active }) =>
			$active ? colors.primary.primatyDark : colors.greyScale.grey4};

	width: 100%;
	height: 100%;
	padding: 0;
`;

const CommunityCategory = () => {
	const navigation = useNavigate();
	const categories = ['유레카', '자유게시판'];
	const [button, setButton] = useState('유레카');

	const toggleActive = (category: string) => {
		setButton(category === button ? '유레카' : category);
		// navigation(category === button ? '' : '');
	};

	return (
		<StyledCategoryContainer>
			{categories.map((item, idx) => (
				<StyledCategoryButton
					key={idx}
					$active={item === button}
					onClick={() => toggleActive(item)}
				>
					{item}
				</StyledCategoryButton>
			))}
		</StyledCategoryContainer>
	);
};

export default CommunityCategory;

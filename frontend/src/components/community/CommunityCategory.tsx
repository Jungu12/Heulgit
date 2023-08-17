import { colors } from '@constants/colors';
import React, { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
			$active ? colors.primary.primary : colors.greyScale.grey4};
	color: ${({ $active }) => ($active ? 'black' : colors.greyScale.grey4)};
	width: 100%;
	height: 100%;
	padding: 0;
`;

type Props = {
	button: string;
	toggleActive: (category: string) => void;
	setButton: React.Dispatch<React.SetStateAction<string>>;
};

const CommunityCategory = ({ button, toggleActive, setButton }: Props) => {
	const location = useLocation();
	const categories = ['유레카', '자유게시판'];

	// 경로 이름에 따라 카테고리 이름을 변경하는 함수
	const changeCategory = useCallback((name: string) => {
		if (name === 'free') return '자유게시판';
		if (name === 'eureka') return '유레카';
		return '';
	}, []);

	useEffect(() => {
		const cur = location.pathname.split('community/')[1];
		setButton(changeCategory(cur ?? 'eureka')); // 경로 이름에 따라 현재 선택된 버튼을 설정합니다.
	}, []);

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

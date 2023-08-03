import { colors } from '@constants/colors';
import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

// 필터 카테고리 컨테이너
const StyledFilterContainer = styled.div`
	display: flex;
	position: fixed;
	justify-content: space-around;
	align-items: center;
	z-index: 50;

	width: 100%;
	height: 55px;
	top: 108px;

	border-bottom: solid 2px ${colors.greyScale.grey3};
	background-color: white;
`;

// 필터 버튼
const StyledFilterButton = styled.button<{ $active: boolean }>`
	color: ${(props) => (props.$active ? 'white' : colors.greyScale.grey4)};
	font-size: 12px;
	font-weight: 600;

	padding: 0;
	width: 88px;
	height: 28px;

	border: solid 2px
		${({ $active }) =>
			$active ? colors.primary.primary : colors.greyScale.grey4};
	border-radius: 36px;

	background-color: ${({ $active }) =>
		$active ? colors.primary.primary : 'white'};
`;

const FilterCategory = () => {
	// const navigation = useNavigate();
	const categories = ['전체 보기', '좋아요 많은 순', '댓글 많은 순', '조회 순'];
	const [button, setButton] = useState('전체 보기');

	return (
		<StyledFilterContainer>
			{categories.map((item, idx) => (
				<StyledFilterButton
					key={idx}
					$active={item === button}
					onClick={() => setButton(item)}
				>
					{item}
				</StyledFilterButton>
			))}
		</StyledFilterContainer>
	);
};

export default FilterCategory;

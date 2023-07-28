import { colors } from '@constants/colors';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

// 필터 카테고리 컨테이너
const StyledFilterContainder = styled.div`
	display: flex;
	position: fixed;
	justify-content: space-around;
	align-items: center;
	z-index: 50;

	width: 100%;
	height: 55px;

	top: 110px;

	border-bottom: solid 2px ${colors.greyScale.grey3};
	/* background-color: #ffffff; */
`;

// 필터 버튼
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
	const navigation = useNavigate();

	return (
		<StyledFilterContainder>
			<StyledFilterButton onClick={() => navigation('/')}>
				전체 보기
			</StyledFilterButton>
			<StyledFilterButton onClick={() => navigation('/')}>
				좋아요 많은 순
			</StyledFilterButton>
			<StyledFilterButton onClick={() => navigation('/')}>
				댓글 많은 순
			</StyledFilterButton>
			<StyledFilterButton onClick={() => navigation('/')}>
				조회 순
			</StyledFilterButton>
		</StyledFilterContainder>
	);
};

export default FilterCategory;

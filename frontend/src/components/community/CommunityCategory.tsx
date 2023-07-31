import { colors } from '@constants/colors';
import React from 'react';
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

	border-bottom: solid 2px ${colors.greyScale.grey3};
	background-color: #ffffff;
`;

// 커뮤니티 선택 버튼
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
	const navigation = useNavigate();
	return (
		<StyledCategoryContainer>
			<StyledCategoryButton onClick={() => navigation('/community/eureka')}>
				유레카
			</StyledCategoryButton>
			<StyledCategoryButton onClick={() => navigation('/community/free')}>
				자유게시판
			</StyledCategoryButton>
		</StyledCategoryContainer>
	);
};

export default CommunityCategory;

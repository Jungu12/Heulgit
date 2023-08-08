import { colors } from '@constants/colors';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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

	width: 100%;
	height: 100%;
	padding: 0;
`;

const CommunityCategory = () => {
	const navigation = useNavigate();
	const location = useLocation();
	const categories = ['유레카', '자유게시판'];
	const [button, setButton] = useState('유레카');

	// 선택된 카테고리 버튼을 토글하는 함수
	const toggleActive = (category: string) => {
		setButton(category);
		if (category === '유레카') {
			navigation('/community/eureka'); // '유레카' 버튼을 클릭했을 때 '/community/eureka'로 이동
		} else {
			navigation('/community/free'); // '자유게시판' 버튼을 클릭했을 때 '/community/free'로 이동
		}
	};

	// 경로 이름에 따라 카테고리 이름을 변경하는 함수
	const changeCategory = useCallback((name: string) => {
		if (name === 'free') return '자유게시판';
		if (name === 'eureka') return '유레카';
		return '';
	}, []);

	useEffect(() => {
		console.log(button); // 선택된 버튼이 변경될 때마다 로그를 출력합니다.
	}, [button]);

	useEffect(() => {
		const cur = location.pathname.split('community/')[1];
		setButton(changeCategory(cur)); // 경로 이름에 따라 현재 선택된 버튼을 설정합니다.
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

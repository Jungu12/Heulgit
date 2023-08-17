import { colors } from '@constants/colors';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

// 커뮤니티 필터 전체 컨테이너
const StlyedCommunityFilterContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	width: 297px;
	/* height: 100%; */

	/* margin-top: 35px; */
	padding: 35px 35px 0 35px;

	background-color: ${colors.primary.primatyDark};

	color: white;
`;

// 게시판 필터 컨테이너
const StyledCommunityCategoryContainer = styled.div`
	width: 242px;
	/* height: 290px; */
`;

// 필터 컨테이너
const StyledFilterContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;
`;

// 선택된 게시판 이름
const StyledSelectedCommunityName = styled.div`
	display: flex;
	align-items: center;
	font-size: 28px;
	font-weight: 800;

	height: 50px;

	/* border-bottom: solid 0.5px ${colors.greyScale.grey3}; */
`;

// 필터 고르는 버튼
const StyledFilterButton = styled.button<{ $isactive: boolean }>`
	font-size: 20px;
	font-weight: ${({ $isactive }) => ($isactive ? 700 : 400)};

	margin: 20px 0;

	background-color: transparent;
	color: ${({ $isactive }) =>
		$isactive ? colors.primary.primaryLighten : 'white'};
`;

// 필터 구분 div
const StyledSeperationDiv = styled.div`
	height: 30px;
`;

const CommunityMenuBarPC = () => {
	const navigation = useNavigate();
	// 커뮤니티 카테고리 버튼
	const communityCategories = ['알림', '깃속말'];
	const [communityButton, setCommunityButton] = useState('알림');

	// 필터 버튼
	const FilterCategories = ['흘깃판', '게시판', '검색', '프로필'];
	const [filterButton, setFilterButton] = useState('전체 보기');

	// 선택된 카테고리 버튼을 토글하는 함수
	const categoryToggleActive = (category: string) => {
		setCommunityButton(category);
		if (category === '유레카') {
			navigation('/community/eureka'); // '유레카' 버튼을 클릭했을 때 '/community/eureka'로 이동
		} else {
			navigation('/community/free'); // '자유게시판' 버튼을 클릭했을 때 '/community/free'로 이동
		}
	};

	const filterToggleActive = (category: string) => {
		setFilterButton(category);
		if (category === '전체') {
			navigation('/community/eureka'); // '유레카' 버튼을 클릭했을 때 '/community/eureka'로 이동
		} else {
			navigation('/community/free'); // '자유게시판' 버튼을 클릭했을 때 '/community/free'로 이동
		}
	};

	return (
		<StlyedCommunityFilterContainer>
			<StyledCommunityCategoryContainer>
				<StyledSelectedCommunityName>HeulGit</StyledSelectedCommunityName>

				<StyledFilterContainer>
					{FilterCategories.map((item, idx) => (
						<StyledFilterButton
							key={idx}
							$isactive={item === filterButton}
							onClick={() => filterToggleActive(item)}
						>
							{item}
						</StyledFilterButton>
					))}
				</StyledFilterContainer>

				<StyledSeperationDiv />

				<StyledFilterContainer>
					{communityCategories.map((item, idx) => (
						<StyledFilterButton
							key={idx}
							$isactive={item === communityButton}
							onClick={() => categoryToggleActive(item)}
						>
							{item}
						</StyledFilterButton>
					))}
				</StyledFilterContainer>
			</StyledCommunityCategoryContainer>
			{/* <StyledLogo src={images.logo} alt="로고" /> */}
		</StlyedCommunityFilterContainer>
	);
};

export default CommunityMenuBarPC;

import { colors } from '@constants/colors';
import { images } from '@constants/images';
import React, { useCallback, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import CreateFreePostModal from './CreateFreePostModal ';

// 커뮤니티 필터 전체 컨테이너
const StlyedCommunityFilterContainer = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;

	width: 297px;
	/* height: 100%; */

	margin-top: 35px;
	padding-left: 10px;

	/* background-color: ${colors.primary.primatyDark}; */

	/* color: white; */
`;

// 필터 컨테이너
const StyledFilterContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;

	/* width: 250px; */
	/* padding: 20px; */

	/* border: 1px solid ${colors.primary.primaryLighten}; */
	/* border-radius: 5px; */
`;

// 선택된 게시판 이름
const StyledSelectedCommunityName = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	font-size: 25px;
	font-weight: 800;

	/* width: 200px; */
	height: 50px;
	margin-bottom: 20px;

	/* background-color: ${colors.primary.primatyDark}; */
	color: ${colors.primary.primatyDark};
	/* color: white; */

	border-bottom: solid 1px ${colors.primary.primatyDark};
	border-top: solid 1px ${colors.primary.primatyDark};
`;

// 필터 종류 ( 카테고리 or 정렬 )
const StyledFilter = styled.div`
	font-size: 24px;
	font-weight: 700;

	/* margin: 10px 0; */
	margin-bottom: 10px;

	color: ${colors.primary.primaryLighten};
`;

// 필터 고르는 버튼
const StyledFilterButton = styled.button<{ $isactive: boolean }>`
	/* width: 100%; */
	height: 30px;

	font-size: 18px;
	font-weight: ${({ $isactive }) => ($isactive ? 600 : 'none')};

	margin: 10px 0;

	background-color: transparent;
	/* color: ${({ $isactive }) =>
		$isactive ? colors.primary.primaryLighten : 'white'}; */

	color: ${({ $isactive }) =>
		$isactive ? colors.primary.primatyDark : 'dark'};

	/* border: 1px solid ${colors.primary.primaryLighten}; */
	/* border-radius: 5px; */
`;

// 공백 div
const StyledSeperationDiv = styled.div`
	height: 30px;
`;

// 글 작성하기 컨테이너
const StyledCreateContainer = styled.div`
	display: flex;
	flex-direction: row;
	position: relative;
	/* position: absolute; */
	/* bottom: 0; */
`;

// 글 작성하기 버튼
const StyledCreateButton = styled.button`
	display: flex;
	justify-content: start;

	font-size: 24px;
	font-weight: 700;
	color: ${colors.primary.primatyDark};

	background-color: transparent;
`;

const StyledCreateButtonIcon = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	img {
		width: 22px;
		height: 22px;
		margin: 3px 5px 0 0;
	}
`;

const customStyles = {
	overlay: {
		backgroundColor: 'rgba(0, 0, 0, 0.3)', // 오버레이 배경색을 투명하게 설정
	},
	content: {
		width: '700px',
		height: '630px',

		// top: '0',
		// left: '28%',
		// right: '28%',
		margin: 'auto',
		padding: '0',

		background: 'rgba(255, 255, 255, 0.6)',
		backdropFilter: 'blur(10px)',

		webkitBackdropFilter: 'blur(10px)', // -webkit-backdrop-filter 추가
		zIndex: '99',

		border: 'none',
		borderRadius: '20px',
	},
};

const CommunityFilterPC = () => {
	const navigation = useNavigate();
	// 커뮤니티 카테고리 버튼
	const communityCategories = ['유레카', '자유게시판'];
	const [communityButton, setCommunityButton] = useState('유레카');

	// 필터 버튼
	const FilterCategories = [
		'전체 보기',
		'좋아요 많은 순',
		'댓글 많은 순',
		'조회 순',
	];
	const [filterButton, setFilterButton] = useState('전체 보기');

	const [isOpen, setIsOpen] = useState(false);

	const onClickWriteButton = useCallback(() => {
		setIsOpen(true);
	}, []);

	// 선택된 카테고리 버튼을 토글하는 함수
	const categoryToggleActive = (category: string) => {
		setCommunityButton(category);
		if (category === '유레카') {
			navigation('/community/eureka'); // '유레카' 버튼을 클릭했을 때 '/community/eureka'로 이동
		} else {
			navigation('/community/free'); // '자유게시판' 버튼을 클릭했을 때 '/community/free'로 이동
		}
	};

	useEffect(() => {
		console.log(communityButton); // 선택된 버튼이 변경될 때마다 로그를 출력합니다.
	}, [communityButton]);

	const filterToggleActive = (category: string) => {
		setFilterButton(category);
		if (category === '전체') {
			navigation('/community/eureka'); // '유레카' 버튼을 클릭했을 때 '/community/eureka'로 이동
		} else {
			navigation('/community/free'); // '자유게시판' 버튼을 클릭했을 때 '/community/free'로 이동
		}
	};

	useEffect(() => {
		console.log(filterButton); // 선택된 버튼이 변경될 때마다 로그를 출력합니다.
	}, [filterButton]);

	return (
		<StlyedCommunityFilterContainer>
			{/* 선택 된 카테고리 */}
			<StyledSelectedCommunityName>
				{communityButton}
			</StyledSelectedCommunityName>
			{/* 커뮤니티 */}
			<StyledFilter>Community</StyledFilter>
			{/* 커뮤니티 필터 */}
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
			{/* 분리 */}
			<StyledSeperationDiv />

			{/* 정렬 */}
			<StyledFilter>Filter</StyledFilter>
			{/* 정렬 필터 */}
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

			{/* 글 작성하기 모달창 띄우는 버튼 */}
			<StyledCreateContainer>
				<StyledCreateButtonIcon>
					<img src={images.community.createPostIcOnly} alt="글쓰기" />
				</StyledCreateButtonIcon>
				<StyledCreateButton onClick={onClickWriteButton}>
					글 작성하기
				</StyledCreateButton>
			</StyledCreateContainer>
			{/* 글 작성하는 모달창 띄우기 */}
			<ReactModal isOpen={isOpen} style={customStyles}>
				<div>
					<CreateFreePostModal closeModal={() => setIsOpen(false)} />
				</div>
			</ReactModal>
		</StlyedCommunityFilterContainer>
	);
};

export default CommunityFilterPC;

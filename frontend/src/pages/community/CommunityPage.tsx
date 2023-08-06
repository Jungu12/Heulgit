import Header from '@components/common/Header';
import { Mobile, PC, Tablet } from '@components/common/MediaQuery';
import Navigation from '@components/common/Navigation';
import CommunityCategory from '@components/community/CommunityCategory';
import FilterCategory from '@components/community/FilterCategory';
import React, { useState, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CreateFreePostModal from './CreateFreePostModal ';
import { colors } from '@constants/colors';
import { images } from '@constants/images';
import ReactModal from 'react-modal';

// 커뮤니티 모바일 버전
const CommunityContainerMobile = styled.div`
	display: flex;
	height: calc(var(--vh, 1vh) * 100);
	flex-direction: column;
	align-items: center;

	overflow-y: scroll;
	-ms-overflow-style: none; /* 인터넷 익스플로러 */
	scrollbar-width: none; /* 파이어폭스 */

	/* 스크롤바 숨기기 (인터넷 익스플로러, 파이어폭스 */
	&::-webkit-scrollbar {
		display: none; /* 크롬, 사파리, 엣지 */
	}
	&::-ms-scrollbar {
		display: none; /* 인터넷 익스플로러 */
	}
`;

// 피드 컨테이너 모바일 버전
const StyledFeedContainerMobile = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;

	top: 163px;
	width: 100%;
`;
// 모바일 버전 끝

// 커뮤니티 테블릿 버전
const CommunityContainerTabletPC = styled.div`
	display: flex;
	height: 100vh;
	justify-content: space-between;
	/* align-items: center; */

	overflow-y: scroll;
	-ms-overflow-style: none; /* 인터넷 익스플로러 */
	scrollbar-width: none; /* 파이어폭스 */

	/* 스크롤바 숨기기 (인터넷 익스플로러, 파이어폭스 */
	&::-webkit-scrollbar {
		display: none; /* 크롬, 사파리, 엣지 */
	}
	&::-ms-scrollbar {
		display: none; /* 인터넷 익스플로러 */
	}
`;

// 피드 컨테이너 테블릿 PC 버전
const StyledFeedContainerTabletPC = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;

	margin-top: 35px;
	width: 520px;
`;

// 왼쪽 메뉴바 테블릿 버전
const StyledMenuContainerTablet = styled.div`
	display: flex;

	width: 124px;

	background-color: antiquewhite;
`;

// 오른쪽 카테고리바 테블릿 버전
const StyledCategoryContainerTablet = styled.div`
	display: flex;

	margin-top: 35px;
	width: 124px;

	background-color: antiquewhite;
`;
// 테블릿 버전 끝

// 피드 컨테이너 PC 버전
const StyledFeedContainerPC = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;

	width: 520px;
	margin-top: 35px;
`;

// 왼쪽 메뉴바 PC 버전
const StyledMenuContainerPC = styled.div`
	display: flex;

	width: 242px;

	background-color: antiquewhite;
`;

// 오른쪽 카테고리바 PC 버전
const StyledCategoryContainerPC = styled.div`
	display: flex;

	margin-top: 35px;
	width: 242px;

	background-color: antiquewhite;
`;

// 게시물 작성 버튼 모바일
const StyledCreateButtonMobile = styled.button`
	display: flex;
	position: fixed;
	bottom: 100px;
	right: 40px;

	width: 70px;
	height: 70px;

	border: none;
	border-radius: 50%;
	background-color: ${colors.primary.primary};

	padding: 0;
	background-image: url(${images.community.createPost});
	background-size: 60%;
	background-repeat: no-repeat;
	background-position: center;
`;

// 게시물 작성 버튼 테블릿 PC
const StyledCreateButtonTabletPC = styled.button`
	display: flex;
	position: fixed;

	bottom: 5%;
	right: 5%;

	width: 70px;
	height: 70px;

	border: none;
	border-radius: 50%;
	background-color: ${colors.primary.primary};

	padding: 0;
	background-image: url(${images.community.createPost});
	background-size: 60%;
	background-repeat: no-repeat;
	background-position: center;
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

const CommunityPage = () => {
	const navigation = useNavigate();
	const [isOpen, setIsOpen] = useState(false);

	const onClickWriteButton = useCallback(() => {
		setIsOpen(true);
	}, []);

	return (
		<>
			{/* 모바일 버전 */}
			<Mobile>
				<CommunityContainerMobile>
					<Header title="커뮤니티" type="home" />
					<CommunityCategory />
					<FilterCategory />
					<StyledFeedContainerMobile>
						<Outlet />
					</StyledFeedContainerMobile>
					<StyledCreateButtonMobile
						onClick={() => navigation('/community/free/post')}
					/>
					<Navigation />
				</CommunityContainerMobile>
			</Mobile>

			{/* 테블릿 버전 */}
			<Tablet>
				<CommunityContainerTabletPC>
					<StyledMenuContainerTablet />
					<StyledFeedContainerTabletPC>
						<Outlet />
					</StyledFeedContainerTabletPC>
					<StyledCreateButtonTabletPC onClick={onClickWriteButton} />
					<StyledCategoryContainerTablet />
				</CommunityContainerTabletPC>
				<ReactModal isOpen={isOpen} style={customStyles}>
					<div>
						<CreateFreePostModal closeModal={() => setIsOpen(false)} />
					</div>
				</ReactModal>
			</Tablet>

			{/* 웹 버전 */}
			<PC>
				<CommunityContainerTabletPC>
					<StyledMenuContainerPC />
					<StyledFeedContainerPC>
						<Outlet />
					</StyledFeedContainerPC>
					<StyledCreateButtonTabletPC onClick={onClickWriteButton} />
					<StyledCategoryContainerPC />
				</CommunityContainerTabletPC>
				<ReactModal isOpen={isOpen} style={customStyles}>
					<div>
						<CreateFreePostModal closeModal={() => setIsOpen(false)} />
					</div>
				</ReactModal>
			</PC>
		</>
	);
};

export default CommunityPage;

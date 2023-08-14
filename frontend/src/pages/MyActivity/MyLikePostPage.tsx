import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '@components/common/Header';
import BigHeader from '@components/profile/BigHeader';
import Category from '@components/profile/Category';
import CategoryT from '@components/profile/CategoryT';
import { colors } from '@constants/colors';
import LikeEureka from '@pages/MyActivity/LikeEureka';
import LikeFreeboard from './LikeFreeboard';

//스타일
const StyledBox = styled.div`
	height: 100vh;
	@media (min-width: 768px) {
		display: flex;
		justify-content: center;
	}

	overflow-y: auto;
	scrollbar-width: none; /* 파이어폭스 */
	/* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
	&::-webkit-scrollbar {
		display: none;
	}
`;

const StyledSideL = styled.div`
	height: 100vh;
	left: 0;
	position: fixed;

	@media (max-width: 767px) {
		display: none;
	}
	@media (min-width: 768px) {
		width: 124px;
		background-color: ${colors.primary.primary};
	}
	@media (min-width: 1200px) {
		width: 242px;
		background-color: ${colors.primary.primary};
	}
`;
const StyledSideR = styled.div`
	height: 100vh;
	right: 0;
	position: fixed;
	padding: 20px;

	@media (max-width: 767px) {
		display: none;
	}
	@media (min-width: 768px) {
		width: 124px;
		background-color: ${colors.primary.primary};
	}
	@media (min-width: 1200px) {
		width: 242px;
		background-color: ${colors.primary.primary};
	}
`;
const StyledContent = styled.div`
	@media (min-width: 768px) {
		width: 500px;
	}
`;

const StyledCate = styled.div`
	width: 100vw;

	@media (min-width: 768px) {
		display: none;
	}
	position: fixed;
	top: 55px;
	background-color: white; /* Add a background color for better visibility */
	z-index: 1;
	margin: 0;
`;
const StyledHeader = styled.div`
	width: 100%;
	height: 95px;
	background-color: white;
`;

const MyLikePostPage = () => {
	const [selectedPost, setSelectedPost] = useState('');
	const handleMenuClick = (menu: '유레카' | '자유') => {
		setSelectedPost(menu);
		sessionStorage.setItem('selectedPost', menu);
	};
	useEffect(() => {
		const categoryItem = sessionStorage.getItem('selectedPost') as
			| '유레카'
			| '자유';

		if (categoryItem) {
			setSelectedPost(categoryItem);
		} else {
			setSelectedPost('유레카');
		}
	}, []);

	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<StyledBox>
			<StyledSideL>
				<div>네비게이션</div>
			</StyledSideL>

			<StyledContent>
				<StyledHeader>
					{windowWidth <= 768 ? (
						<Header title={'좋아요 한 게시물'}></Header>
					) : (
						<BigHeader title={'좋아요 한 게시물'}></BigHeader>
					)}
				</StyledHeader>
				<StyledCate>
					<Category
						menu1={'유레카'}
						menuRouter1={() => handleMenuClick('유레카')}
						menu2={'자유'}
						menuRouter2={() => handleMenuClick('자유')}
						selectedMenu={selectedPost}
					/>
				</StyledCate>
				<div>
					{selectedPost === '유레카' && (
						<div>
							<LikeEureka />
						</div>
					)}
					{selectedPost === '자유' && <div>{/* <LikeFreeboard /> */}</div>}
				</div>
			</StyledContent>

			<StyledSideR>
				<div>카테고리</div>
				<CategoryT
					menu1={'유레카'}
					menuRouter1={() => handleMenuClick('유레카')}
					menu2={'자유'}
					menuRouter2={() => handleMenuClick('자유')}
					selectedMenu={selectedPost} // Category 컴포넌트에 선택된 메뉴 이름을 전달
				/>
			</StyledSideR>
		</StyledBox>
	);
};

export default MyLikePostPage;

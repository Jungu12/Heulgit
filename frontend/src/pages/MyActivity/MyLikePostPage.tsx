import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '@components/common/Header';
import BigHeader from '@components/profile/BigHeader';
import Category from '@components/profile/Category';
import CategoryT from '@components/profile/CategoryT';
import { colors } from '@constants/colors';

const StyledBox = styled.div`
	height: 100vh;
	@media (min-width: 768px) {
		display: flex;
		justify-content: center;
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
		background-color: ${colors.primary.primaryLighten};
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

	@media (max-width: 767px) {
		display: none;
	}
	@media (min-width: 768px) {
		width: 124px;
		background-color: ${colors.primary.primaryLighten};
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
`;
const StyledHeader = styled.div`
	width: 100%;
	height: 60px;
	background-color: white;
`;

const deleteKeysFromSession = (keys: string[]) => {
	console.log('Deleting keys:', keys);
	keys.forEach((key) => sessionStorage.removeItem(key));
};

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

	// 페이지 이동 시 세션 삭제 -> 다시 해당 페이지 이동 시 첫 화면 보이도록
	useEffect(() => {
		const keysToDelete = ['selectedPost'];

		if (window.location.pathname === '/profiles/1/like-post') {
			deleteKeysFromSession(keysToDelete);
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
					{selectedPost === '유레카' && <div>좋아요 한 유레카</div>}
					{selectedPost === '자유' && <div>좋아요 한 자유</div>}
				</StyledCate>{' '}
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

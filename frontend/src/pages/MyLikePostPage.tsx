import Header from '@components/common/Header';
import Category from '@components/profile/Category';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
	width: 100%;
	height: 56px;
	background-color: white;
	margin-bottom: 10px;
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

	// 페이지 이동 시 세션 삭제 -> 다시 해당 페이지 이동 시 첫 화면 보이도록
	const deleteSession = () => {
		console.log('test');
		sessionStorage.clear();
	};
	useEffect(() => {
		window.addEventListener('popstate', deleteSession);
	}, []);

	return (
		<div>
			<StyledHeader>
				<Header title={'좋아요 한 게시물'}></Header>
			</StyledHeader>
			<Category
				menu1={'유레카'}
				menuRouter1={() => handleMenuClick('유레카')}
				menu2={'자유'}
				menuRouter2={() => handleMenuClick('자유')}
				selectedMenu={selectedPost}
			/>
			{selectedPost === '유레카' && <div>좋아요 한 유레카</div>}
			{selectedPost === '자유' && <div>좋아요 한 자유</div>}
		</div>
	);
};

export default MyLikePostPage;

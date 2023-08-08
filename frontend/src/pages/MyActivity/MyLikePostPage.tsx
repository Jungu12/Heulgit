import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '@components/common/Header';
import BigHeader from '@components/profile/BigHeader';
import Category from '@components/profile/Category';
import CategoryT from '@components/profile/CategoryT';
import { colors } from '@constants/colors';
import EurekaFeedItemList from '@components/community/EurekaFeedItemList';
import FreeBoardFeedItemList from '@components/community/FreeBoardFeedItemList';
import { images } from '@constants/images';

//더미데이터
const dummyFreePosts = [
	{
		id: 1,
		title: 'hihi',
		user: {
			id: 'jungu12',
			avater_url: images.dummy.dummy1,
		},
		content: 'eqweqwewq',
		link: 'dfkldfsdfds',
		updated_date: '2023-07-24',
		views: 100,
		likes: 10,
		comments: 12,
		images: [{ file_uri: '' }],
	},
	{
		id: 2,
		title: '일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십',
		user: {
			id: 'jungu12',
			avater_url: images.dummy.dummy1,
		},
		content:
			'일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십',
		link: 'dfkldfsdfds',
		updated_date: '2023-07-24',
		views: 100,
		likes: 10,
		comments: 12,
		images: [{ file_uri: images.dummy.dummy3 }],
	},
	{
		id: 4,
		title: 'hihi',
		user: {
			id: 'jungu12',
			avater_url: images.dummy.dummy1,
		},
		content: 'eqweqwewq',
		link: 'dfkldfsdfds',
		updated_date: '2023-07-24',
		views: 100,
		likes: 10,
		comments: 12,
		images: [{ file_uri: '' }],
	},
	{
		id: 3,
		title: 'hihi',
		user: {
			id: 'jungu12',
			avater_url: images.dummy.dummy1,
		},
		content: 'asdasdasdasdasd',
		link: 'dfkldfsdfds',
		updated_date: '2023-07-24',
		views: 100,
		likes: 10,
		comments: 12,
		images: [{ file_uri: images.dummy.dummy1 }],
	},
];

const dummyEurekaPosts = [
	{
		id: 1,
		title: '여기는 유레카',
		user: {
			id: 'jungu12',
			avater_url: images.dummy.dummy1,
		},
		content: 'eqweqwewq',
		link: 'dfkldfsdfds',
		updated_date: '2023-07-24',
		views: 100,
		likes: 10,
		comments: 12,
		images: [{ file_uri: '' }],
	},
	{
		id: 2,
		title: '유레카입니당 키키',
		user: {
			id: 'jungu12',
			avater_url: images.dummy.dummy1,
		},
		content: 'asdasdasdasdasd',
		link: 'dfkldfsdfds',
		updated_date: '2023-07-24',
		views: 100,
		likes: 10,
		comments: 12,
		images: [{ file_uri: '' }],
	},
	{
		id: 4,
		title: 'hihi',
		user: {
			id: 'jungu12',
			avater_url: images.dummy.dummy1,
		},
		content: 'eqweqwewq',
		link: 'dfkldfsdfds',
		updated_date: '2023-07-24',
		views: 100,
		likes: 10,
		comments: 12,
		images: [{ file_uri: images.dummy.dummy5 }],
	},
	{
		id: 3,
		title: 'hihi',
		user: {
			id: 'jungu12',
			avater_url: images.dummy.dummy1,
		},
		content: 'asdasdasdasdasd',
		link: 'dfkldfsdfds',
		updated_date: '2023-07-24',
		views: 100,
		likes: 10,
		comments: 12,
		images: [{ file_uri: '' }],
	},
	{
		id: 1,
		title: '여기는 유레카',
		user: {
			id: 'jungu12',
			avater_url: images.dummy.dummy1,
		},
		content: 'eqweqwewq',
		link: 'dfkldfsdfds',
		updated_date: '2023-07-24',
		views: 100,
		likes: 10,
		comments: 12,
		images: [{ file_uri: '' }],
	},
	{
		id: 1,
		title: '여기는 유레카',
		user: {
			id: 'jungu12',
			avater_url: images.dummy.dummy1,
		},
		content: '뀨?',
		link: 'dfkldfsdfds',
		updated_date: '2023-07-24',
		views: 100,
		likes: 10,
		comments: 12,
		images: [{ file_uri: images.dummy.dummy5 }],
	},
];

//스타일
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
					{selectedPost === '유레카' && (
						<div>
							좋아요 한 유레카
							<EurekaFeedItemList feedList={dummyEurekaPosts} />
						</div>
					)}
					{selectedPost === '자유' && (
						<div>
							좋아요 한 자유
							<FreeBoardFeedItemList feedList={dummyFreePosts} />
						</div>
					)}
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

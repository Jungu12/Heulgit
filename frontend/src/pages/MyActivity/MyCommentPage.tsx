import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '@components/common/Header';
import BigHeader from '@components/profile/BigHeader';
import { colors } from '@constants/colors';
import { images } from '@constants/images';
import MyCommentList from '@components/profile/MyCommentList';

// 더미 댓글
const dummyComment = [
	{
		id: 123,
		user: {
			id: 'jungu121212',
			avater_url: images.dummy.dummy1,
		},
		content: '@jungu12 이거 참고해',
		updated_date: '36분 전',
		parent_id: 12,
		order: 1,
	},
	{
		id: 123,
		user: {
			id: 'jungu121212',
			avater_url: images.dummy.dummy1,
		},
		content: '@jungu12 싫엉',
		updated_date: '38분 전',
		parent_id: 12,
		order: 1,
	},
];

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

const StyledHeader = styled.div`
	width: 100%;
	height: 60px;
	background-color: white;
`;
const StyledMyComment = styled.div``;

const MyCommentPage = () => {
	// 화면 사이즈별 타이틀 변환
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
						<Header title={'내가 작성한 댓글'}></Header>
					) : (
						<BigHeader title={'내가 작성한 댓글'}></BigHeader>
					)}
				</StyledHeader>
				<StyledMyComment>
					<MyCommentList comments={dummyComment} />
				</StyledMyComment>
			</StyledContent>

			<StyledSideR>
				<div>카테고리</div>
			</StyledSideR>
		</StyledBox>
	);
};

export default MyCommentPage;

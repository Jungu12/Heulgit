import { useNavigate } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '@components/common/Header';
import BigHeader from '@components/profile/BigHeader';
import { colors } from '@constants/colors';
import { authHttp } from '@utils/http';

const StyledBox = styled.div`
	height: 100vh;
	width: 100vw;
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

const StyledActivity = styled.div`
	@media (min-width: 768px) {
		width: 500px;
	}
`;
const StyledActivityMenu = styled.div`
	display: flex;
	align-items: center;
	height: 40px;
	margin: 10px;
	@media (min-width: 768px) {
		font-size: 20px;
	}
	&.user-logout {
		color: ${colors.point.red};
		font-weight: bold;
	}
`;

const StyledEditTitle = styled.div`
	height: 60px;
`;

const MyActivityPage = () => {
	const navigation = useNavigate();

	// 화면 사이즈별 타이틀 변환
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	const onClickLogout = useCallback(() => {
		authHttp
			.get('users/logout')
			.then(() => {
				alert('로그아웃 되었습니다.');
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

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
			<StyledActivity>
				<StyledEditTitle>
					{windowWidth <= 768 ? (
						<Header title={'내활동'}></Header>
					) : (
						<BigHeader title={'내활동'}></BigHeader>
					)}
				</StyledEditTitle>
				<div>
					<StyledActivityMenu
						onClick={() => navigation('/profiles/1/like-repo')}
					>
						좋아요 한 흘깃
					</StyledActivityMenu>
					<StyledActivityMenu
						onClick={() => navigation('/profiles/1/like-post')}
					>
						좋아요 한 게시물
					</StyledActivityMenu>
					<StyledActivityMenu onClick={() => navigation('/profiles/1/comment')}>
						내가 작성한 댓글
					</StyledActivityMenu>
					<StyledActivityMenu className="user-logout" onClick={onClickLogout}>
						로그아웃
					</StyledActivityMenu>
				</div>
			</StyledActivity>
			<StyledSideR>
				<div>카테고리</div>
			</StyledSideR>
		</StyledBox>
	);
};

export default MyActivityPage;

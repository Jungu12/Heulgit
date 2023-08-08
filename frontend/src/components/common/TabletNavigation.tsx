import { colors } from '@constants/colors';
import { images } from '@constants/images';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';

type StyledIconContainerProps = {
	isSelected?: boolean;
};

const StyledNavigationConatiner = styled.div`
	position: fixed;
	left: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 124px;
	height: 100vh;
	background-color: ${colors.primary.primary};
	z-index: 99;
	gap: 29px;
	padding: 24px 0;
`;

const StyledLogoContainer = styled.div`
	text-align: center;
	margin-bottom: 24px;

	p {
		font-size: 16px;
		font-family: 'RixYeoljeongdo_Regular';
		color: white;
		margin-top: 12px;
	}

	img {
		width: 80px;
		height: 80px;
	}
`;

const StyledIconContainer = styled.div<StyledIconContainerProps>`
	display: flex;
	/* justify-content: flex-start; */
	width: 110px;
	align-items: center;
	/* margin-left: 32px; */
	cursor: pointer;
	border-radius: 8px;
	padding: 4px;

	${(props) =>
		props.isSelected &&
		css`
			background-color: rgb(255, 255, 255, 0.25);
		`}

	&:hover {
		transform: scale(1.02);
		background-color: rgb(255, 255, 255, 0.25);
	}

	p {
		font-size: 14px;
		color: white;
		font-weight: 500;
		margin-left: 8px;

		${(props) =>
			props.isSelected &&
			css`
				font-weight: 700;
			`}
	}

	img {
		width: 40px;
		height: 40px;
	}
`;

const StyledBlank = styled.div`
	height: 4px;
	width: 100%;
`;

const TabletNavigation = () => {
	const navigation = useNavigate();
	const location = useLocation();
	const [selectedMenu, setSelectedMenu] = useState('');

	const onClickHeulGitMenu = useCallback(() => {
		setSelectedMenu('');
		navigation('/');
	}, []);

	const onClickCommunityMenu = useCallback(() => {
		setSelectedMenu('community');
		navigation('/community');
	}, []);

	// 클릭 시 옆에서 사이드바 나와야함
	const onClickSearchMenu = useCallback(() => {
		setSelectedMenu('search');
	}, []);

	// 클릭 시 옆에서 사이드바 나와야함
	const onClickAlarmMenu = useCallback(() => {
		setSelectedMenu('alarm');
	}, []);

	useEffect(() => {
		setSelectedMenu(location.pathname.split('/')[1]);
	}, []);

	return (
		<StyledNavigationConatiner>
			<StyledLogoContainer>
				<img src={images.logo} alt="logo" />
				<p>HeulGit</p>
			</StyledLogoContainer>
			<StyledIconContainer
				isSelected={selectedMenu === ''}
				onClick={onClickHeulGitMenu}
			>
				<img src={images.navigation.homeWhite} alt="heulgit" />
				<p>흘깃판</p>
			</StyledIconContainer>
			<StyledIconContainer
				isSelected={selectedMenu === 'community'}
				onClick={onClickCommunityMenu}
			>
				<img src={images.navigation.communityWhite} alt="community" />
				<p>게시판</p>
			</StyledIconContainer>
			<StyledIconContainer
				isSelected={selectedMenu === 'search'}
				onClick={onClickSearchMenu}
			>
				<img src={images.navigation.searchWhite} alt="search" />
				<p>검색</p>
			</StyledIconContainer>
			<StyledIconContainer
				isSelected={selectedMenu === 'profiles'}
				// 여기 1값에 사용자의 id 들어가야함
				onClick={() => navigation('/profiles/1')}
			>
				<img src={images.navigation.profileWhite} alt="profile" />
				<p>프로필</p>
			</StyledIconContainer>
			<StyledBlank />
			<StyledIconContainer
				isSelected={selectedMenu === 'alarm'}
				onClick={onClickAlarmMenu}
			>
				<img src={images.navigation.alarmWhite} alt="alarm" />
				<p>알림</p>
			</StyledIconContainer>
			<StyledIconContainer
				isSelected={selectedMenu === 'gm'}
				// 여기 1값에 사용자의 id 들어가야함
				onClick={() => navigation('/gm/1')}
			>
				<img src={images.navigation.gmWhite} alt="gm" />
				<p>깃속말</p>
			</StyledIconContainer>
		</StyledNavigationConatiner>
	);
};

export default TabletNavigation;

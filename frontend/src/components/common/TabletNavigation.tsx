import { colors } from '@constants/colors';
import { images } from '@constants/images';
import React, { useEffect, useState } from 'react';
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
	border-right: 2px solid ${colors.greyScale.grey3};
	background-color: white;
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
		color: black;
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
	width: 100px;
	align-items: center;
	/* margin-left: 32px; */
	cursor: pointer;
	border-radius: 8px;
	padding: 4px;

	&:hover {
		transform: scale(1.02);
		background-color: ${colors.greyScale.grey2};
	}

	p {
		font-size: 14px;
		color: ${colors.greyScale.grey5};
		font-weight: 500;
		margin-left: 8px;

		${(props) =>
			props.isSelected &&
			css`
				color: black;
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
	const [pathName, setPathName] = useState('');

	useEffect(() => {
		setPathName(location.pathname.split('/')[1]);
	}, []);

	return (
		<StyledNavigationConatiner>
			<StyledLogoContainer>
				<img src={images.logo} alt="logo" />
				<p>HeulGit</p>
			</StyledLogoContainer>
			<StyledIconContainer
				isSelected={pathName === ''}
				onClick={() => navigation('/')}
			>
				<img
					src={
						pathName === ''
							? images.navigation.homeActive
							: images.navigation.homeInactive
					}
				/>
				<p>흘깃판</p>
			</StyledIconContainer>
			<StyledIconContainer
				isSelected={pathName === 'community'}
				onClick={() => navigation('/community')}
			>
				<img
					src={
						pathName === 'community'
							? images.navigation.communityActive
							: images.navigation.communityInactive
					}
				/>
				<p>게시판</p>
			</StyledIconContainer>
			<StyledIconContainer
				isSelected={pathName === 'search'}
				onClick={() => navigation('/search')}
			>
				<img
					src={
						pathName === 'search'
							? images.navigation.searchActive
							: images.navigation.searchInactive
					}
				/>
				<p>검색</p>
			</StyledIconContainer>
			<StyledIconContainer
				isSelected={pathName === 'profiles'}
				// 여기 1값에 사용자의 id 들어가야함
				onClick={() => navigation('/profiles/1')}
			>
				<img
					src={
						pathName === 'profiles'
							? images.navigation.profileActive
							: images.navigation.profileInactive
					}
				/>
				<p>프로필</p>
			</StyledIconContainer>
			<StyledBlank />
			<StyledIconContainer
				isSelected={pathName === 'profiles'}
				// 여기 1값에 사용자의 id 들어가야함
				onClick={() => navigation('/profiles/1')}
			>
				<img
					src={
						pathName === 'profiles'
							? images.navigation.profileActive
							: images.alarm
					}
				/>
				<p>알림</p>
			</StyledIconContainer>
			<StyledIconContainer
				isSelected={pathName === 'profiles'}
				// 여기 1값에 사용자의 id 들어가야함
				onClick={() => navigation('/profiles/1')}
			>
				<img
					src={
						pathName === 'profiles'
							? images.navigation.profileActive
							: images.gitMessage
					}
				/>
				<p>깃속말</p>
			</StyledIconContainer>
		</StyledNavigationConatiner>
	);
};

export default TabletNavigation;

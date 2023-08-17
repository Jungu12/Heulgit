import { colors } from '@constants/colors';
import { images } from '@constants/images';
import { RootState } from '@store/index';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const StyledNavigationConatiner = styled.div`
	position: fixed;
	bottom: 0px;
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 100%;
	height: 70px;
	border-top: 1px solid ${colors.greyScale.grey3};
	background-color: white;
	z-index: 99;

	img {
		width: 32px;
		height: 32px;
		cursor: pointer;
	}
`;

const Navigation = () => {
	const id = useSelector((state: RootState) => state.user.user?.githubId);
	const navigation = useNavigate();
	const location = useLocation();
	const [pathName, setPathName] = useState('');

	useEffect(() => {
		setPathName(location.pathname.split('/')[1]);
	}, []);

	return (
		<StyledNavigationConatiner>
			<img
				src={
					pathName === ''
						? images.navigation.homeActive
						: images.navigation.homeInactive
				}
				onClick={() => navigation('/')}
			/>
			<img
				src={
					pathName === 'community'
						? images.navigation.communityActive
						: images.navigation.communityInactive
				}
				onClick={() => navigation('/community')}
			/>
			<img
				src={
					pathName === 'search'
						? images.navigation.searchActive
						: images.navigation.searchInactive
				}
				onClick={() => navigation('/search')}
			/>
			<img
				src={
					pathName === 'profiles'
						? images.navigation.profileActive
						: images.navigation.profileInactive
				}
				// 여기 1값에 사용자의 id 들어가야함
				onClick={() => navigation(`/profiles/${id}`)}
			/>
		</StyledNavigationConatiner>
	);
};

export default Navigation;

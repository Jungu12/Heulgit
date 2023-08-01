import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Category from '@components/profile/Category';
import Navigation from '@components/common/Navigation';
import { useNavigate } from 'react-router-dom';
import MyFreeboard from '@components/profile/MyFreeboard';
import MyEureka from '@components/profile/MyEureka';
import MyProfile from '@components/profile/MyProfile';

const StyledProfilePage = styled.div``;
const StyledProfileHigh = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 20px;
`;

const StyledUserProfile = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 150px;
`;

const StyledUserImage = styled.img`
	display: flex;
	justify-content: flex-start;
	background-color: black;
	height: 100px;
	width: 100px;
	border-radius: 50px;
`;

const StyledUserInformation = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 20px;
`;

const StyledActivityButton = styled.button`
	height: 25px;
`;

const StyledProfileLow = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20px;
`;

const StyledFooter = styled.div`
	height: 70px;
`;

const ProfilePage: React.FC = () => {
	const [selectedMenu, setSelectedMenu] = useState<
		'프로필' | '유레카' | '자유'
	>('프로필'); // 기본 선택 메뉴는 '프로필'

	const handleMenuClick = (menu: '프로필' | '유레카' | '자유') => {
		setSelectedMenu(menu);
	};

	const navigation = useNavigate();

	useEffect(() => {
		// 필요한 경우 선택한 메뉴에 따른 데이터를 가져오거나 사이드 이펙트를 처리할 수 있습니다.
	}, [selectedMenu]);

	return (
		<StyledProfilePage>
			<StyledProfileHigh>
				{' '}
				<StyledUserProfile>
					{/* <StyledProfileImage src={feed.user.avater_url} alt="user_profile" /> */}

					<StyledUserImage src={''} alt="user_profile" />
					<StyledUserInformation>
						<div>유저 이름</div>
						<div onClick={() => navigation('/profiles/1/follow')}>
							팔로잉 팔로워
						</div>
						<div>추가 정보</div>
					</StyledUserInformation>
				</StyledUserProfile>
				<StyledActivityButton
					onClick={() => navigation('/profiles/1/activity')}
				>
					내활동
				</StyledActivityButton>
			</StyledProfileHigh>
			<Category
				menu1={'프로필'}
				menuRouter1={() => handleMenuClick('프로필')}
				menu2={'유레카'}
				menuRouter2={() => handleMenuClick('유레카')}
				menu3={'자유'}
				menuRouter3={() => handleMenuClick('자유')}
			/>
			{selectedMenu === '프로필' && (
				<StyledProfileLow>
					<MyProfile />
				</StyledProfileLow>
			)}
			{selectedMenu === '유레카' && (
				<StyledProfileLow>
					<MyEureka />
				</StyledProfileLow>
			)}
			{selectedMenu === '자유' && (
				<StyledProfileLow>
					<MyFreeboard />
				</StyledProfileLow>
			)}
			<StyledFooter>
				<Navigation />
			</StyledFooter>
		</StyledProfilePage>
	);
};

export default ProfilePage;

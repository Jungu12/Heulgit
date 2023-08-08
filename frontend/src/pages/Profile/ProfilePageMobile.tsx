import React from 'react';
import styled from 'styled-components';
import Category from '@components/profile/Category';
import Navigation from '@components/common/Navigation';
import { useNavigate } from 'react-router-dom';
import MyFreeboard from '@components/profile/MyFreeboard';
import MyEureka from '@components/profile/MyEureka';
import MyProfile from '@components/profile/MyProfile';
import { images } from '@constants/images';

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
const StyledActivityButton = styled.div`
	display: flex;
	flex-direction: column;
	align-items: end;
`;
const StyledActivityButtonItem = styled.button`
	height: 25px;
	background-color: transparent;
	img {
		height: 25px;
	}
	padding: 5px;
`;

const SboxTop = styled.div``;
const CateDiv = styled.div`
	height: 85px;

	position: sticky;
	top: 0;
	background-color: white; /* Add a background color for better visibility */
	z-index: 1;
`;
const Sdiv = styled.div``;
const StyledProfileLow = styled.div`
	/* display: flex; */
	/* flex-direction: column; */
	justify-content: center;
	align-items: center;
	padding: 20px;
`;

const StyledFooter = styled.div`
	height: 70px;
`;

type ProfileProps = {
	handleMenuClick: (menu: '프로필' | '유레카' | '자유') => void;
	navigation: ReturnType<typeof useNavigate>;
	selectedMenu: string;
};

const ProfilePageMobile = ({
	handleMenuClick,
	navigation,
	selectedMenu,
}: ProfileProps) => {
	return (
		<StyledProfilePage>
			<StyledProfileHigh>
				<StyledUserProfile>
					<StyledUserImage src={''} alt="user_profile" />
					<StyledUserInformation>
						<div>유저 이름</div>
						<div onClick={() => navigation('/profiles/1/follow')}>
							팔로잉 팔로워
						</div>
						<div>추가 정보</div>
					</StyledUserInformation>
				</StyledUserProfile>
				<StyledActivityButton>
					<StyledActivityButtonItem
						onClick={() => navigation('/profiles/1/activity')}
					>
						<img src={images.menu} alt="내활동" />
					</StyledActivityButtonItem>
					<div>
						<StyledActivityButtonItem onClick={() => navigation('/profiles/1')}>
							<img src={images.profile.followIcon} alt="팔로우" />
						</StyledActivityButtonItem>
						<StyledActivityButtonItem onClick={() => navigation('/gm')}>
							<img src={images.gitMessage} alt="채팅" />
						</StyledActivityButtonItem>
					</div>
				</StyledActivityButton>
			</StyledProfileHigh>
			<SboxTop>
				<CateDiv>
					<Category
						menu1={'프로필'}
						icon11={images.profile.profileActive}
						icon12={images.profile.profileInactive}
						menuRouter1={() => handleMenuClick('프로필')}
						menu2={'유레카'}
						icon21={images.profile.eurekaActive}
						icon22={images.profile.eurekaInactive}
						menuRouter2={() => handleMenuClick('유레카')}
						menu3={'자유'}
						icon31={images.profile.freeActive}
						icon32={images.profile.freeInactive}
						menuRouter3={() => handleMenuClick('자유')}
						selectedMenu={selectedMenu}
					/>
				</CateDiv>
				<Sdiv>
					<StyledProfileLow>
						{selectedMenu === '프로필' && <MyProfile />}
						{selectedMenu === '유레카' && <MyEureka />}
						{selectedMenu === '자유' && <MyFreeboard />}
					</StyledProfileLow>
				</Sdiv>
			</SboxTop>

			<StyledFooter>
				<Navigation />
			</StyledFooter>
		</StyledProfilePage>
	);
};

export default ProfilePageMobile;

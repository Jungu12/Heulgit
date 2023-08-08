import React from 'react';
import styled from 'styled-components';
import CategoryT from '@components/profile/CategoryT';
import { useNavigate } from 'react-router-dom';
import MyFreeboard from '@components/profile/MyFreeboard';
import MyEureka from '@components/profile/MyEureka';
import MyProfile from '@components/profile/MyProfile';
import { colors } from '@constants/colors';

const StyledBox = styled.div`
	display: flex;
	justify-content: space-between;
`;

const StyledL = styled.div`
	width: 124px;
`;
const StyledR = styled.div`
	width: 184px;
`;
const StyledNav = styled.div`
	width: 124px;
	height: 100vh;
	background-color: ${colors.primary.primaryLighten};

	position: fixed;
	top: 0px;
	left: 0px;
	z-index: 1;
`;
const StyledCate = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	padding: 20px;
	width: 184px;
	height: 100vh;
	background-color: ${colors.primary.primaryLighten};

	position: fixed;
	top: 0px;
	right: 0px;
	z-index: 1;
`;
const StyledProfilePage = styled.div`
	width: 500px;
`;
const StyledProfileLow = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20px;
`;

// 유저 프로필
const StyledUserProfileBox = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 20px;
`;
const StyledUserProfile = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
const StyledUserImage = styled.img`
	display: flex;
	justify-content: flex-start;
	background-color: black;
	height: 140px;
	width: 140px;
	border-radius: 50%;
`;
const StyledUserInformation = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 20px;
	font-size: 20px;
	div {
		height: 25px;
	}
	.user-follower {
		display: flex;
		justify-content: center;
		background-color: aquamarine;
	}
`;

//팔로우, 깃속말 버튼
const StyledButton = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	width: 80px;
`;
const StyledButtonBox = styled.div``;
const StyledButtonItem = styled.button`
	height: 35px;
	width: 80px;
	border-radius: 10px;
	margin-bottom: 5px;
	color: white;
	background-color: ${colors.primary.primary};
`;

const StyledCateUser = styled.div`
	width: 100%;
	font-size: 24px;
	font-weight: bold;
	padding-bottom: 15px;
	border-bottom: 2px solid ${colors.primary.primary};
`;
const StyledActivity = styled.div`
	margin-top: 100px;
	width: 100%;
	font-size: 20px;
	font-weight: bold;
`;

type ProfileProps = {
	handleMenuClick: (menu: '프로필' | '유레카' | '자유') => void;
	navigation: ReturnType<typeof useNavigate>;
	selectedMenu: string;
};

const ProfilePageTablet = ({
	handleMenuClick,
	navigation,
	selectedMenu,
}: ProfileProps) => {
	return (
		<StyledBox>
			<StyledL>
				<StyledNav>네비게이션</StyledNav>
			</StyledL>
			<StyledProfilePage>
				<StyledUserProfileBox>
					<StyledUserProfile>
						<StyledUserImage src={''} alt="user_profile" />
						<StyledUserInformation>
							<div className="user-name">유저 이름</div>
							<div className="user-follower">
								<div onClick={() => navigation('/profiles/1/follow')}>
									팔로잉
								</div>
								<div onClick={() => navigation('/profiles/1/follow')}>
									팔로워
								</div>
							</div>
							<div className="user-info">추가 정보</div>
						</StyledUserInformation>
					</StyledUserProfile>
					<StyledButton>
						<StyledButtonBox>
							<StyledButtonItem onClick={() => navigation('/profiles/1')}>
								팔로우
							</StyledButtonItem>
							<StyledButtonItem onClick={() => navigation('/gm')}>
								깃속말
							</StyledButtonItem>
						</StyledButtonBox>
					</StyledButton>
				</StyledUserProfileBox>

				<StyledProfileLow>
					{selectedMenu === '프로필' && <MyProfile />}
					{selectedMenu === '유레카' && <MyEureka />}
					{selectedMenu === '자유' && <MyFreeboard />}
				</StyledProfileLow>
			</StyledProfilePage>
			<StyledR>
				<StyledCate>
					<StyledCateUser>일이삼사오육칠팔구십</StyledCateUser>
					<CategoryT
						menu1={'프로필'}
						menuRouter1={() => handleMenuClick('프로필')}
						menu2={'유레카'}
						menuRouter2={() => handleMenuClick('유레카')}
						menu3={'자유'}
						menuRouter3={() => handleMenuClick('자유')}
						selectedMenu={selectedMenu} // Category 컴포넌트에 선택된 메뉴 이름을 전달
					/>
					<StyledActivity onClick={() => navigation('/profiles/1/activity')}>
						내활동
					</StyledActivity>
				</StyledCate>
			</StyledR>
		</StyledBox>
	);
};

export default ProfilePageTablet;

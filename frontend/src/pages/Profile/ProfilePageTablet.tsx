import React, { useState } from 'react';
import styled from 'styled-components';
import CategoryT from '@components/profile/CategoryT';
import { useNavigate } from 'react-router-dom';
import { colors } from '@constants/colors';
import TabletNavigation from '@components/common/TabletNavigation';
import FollowingPage from '@pages/FollowingPage';
import FollowerPage from '@pages/FollowerPage';
import ReactModal from 'react-modal'; // react-modal 라이브러리 import 추가

const StyledBox = styled.div`
	display: flex;
	justify-content: space-between;
`;

const StyledL = styled.div`
	width: 124px;
`;
const StyledR = styled.div`
	width: 154px;
`;

const StyledCate = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	padding: 20px;
	width: 154px;
	height: 100vh;
	background-color: ${colors.primary.primary};
	color: white;

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
	height: 120px;
	width: 120px;
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
	}
`;
const StyledFollowing = styled.div`
	background-color: aquamarine;
	width: 120px;
`;
const StyledFollower = styled.div`
	width: 120px;
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

// 모달 디자인
const customStyles = {
	overlay: {
		zIndex: '99',
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
	},
	content: {
		width: '400px',
		// height: '70vh',
		height: '400px',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		background: 'rgba(255, 255, 255)',
		backdropFilter: 'blur(10px)',
		// zIndex: '99',
		border: 'none',
		borderRadius: '15px',
		padding: '0',
	},
};

const StyledModalItem = styled.div`
	height: 100%;
	overflow-y: auto;
	scrollbar-width: none; /* 파이어폭스 */
	/* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
	&::-webkit-scrollbar {
		display: none;
	}
`;
// 모달 내부 닫기 버튼 스타일
const StyledCloseButton = styled.div`
	border: none;
	background-color: white;
	font-size: 16px;
	position: fixed;
	z-index: 101;

	padding: 10px;
	margin: 10px;
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
	const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
	const [isFollowerModalOpen, setIsFollowerModalOpen] = useState(false);

	const openFollowingModal = () => setIsFollowingModalOpen(true);
	const closeFollowingModal = () => setIsFollowingModalOpen(false);
	const openFollowerModal = () => setIsFollowerModalOpen(true);
	const closeFollowerModal = () => setIsFollowerModalOpen(false);

	return (
		<StyledBox>
			<StyledL>
				{/* <StyledNav>네비게이션</StyledNav> */}
				<TabletNavigation />
			</StyledL>
			<StyledProfilePage>
				<StyledUserProfileBox>
					<StyledUserProfile>
						<StyledUserImage src={''} alt="user_profile" />
						<StyledUserInformation>
							<div className="user-name">유저 이름</div>
							<div className="user-follower">
								{/* 모달열기 */}
								<StyledFollowing onClick={openFollowingModal}>
									팔로잉
								</StyledFollowing>
								<StyledFollower onClick={openFollowerModal}>
									팔로워
								</StyledFollower>
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
					{/* {selectedMenu === '프로필' && <MyProfile />} */}
					{/* {selectedMenu === '유레카' && <MyEureka />} */}
					{/* {selectedMenu === '자유' && <MyFreeboard />} */}
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

			{/* 팔로잉 모달 */}
			<ReactModal
				isOpen={isFollowingModalOpen}
				style={customStyles}
				onRequestClose={closeFollowingModal}
			>
				<StyledModalItem>
					<StyledCloseButton onClick={closeFollowingModal}>
						닫기
					</StyledCloseButton>
					<FollowingPage />
				</StyledModalItem>
			</ReactModal>

			<ReactModal
				isOpen={isFollowerModalOpen}
				style={customStyles}
				onRequestClose={closeFollowerModal}
			>
				<StyledModalItem>
					<StyledCloseButton onClick={closeFollowerModal}>
						닫기
					</StyledCloseButton>
					<FollowerPage />
				</StyledModalItem>
			</ReactModal>
		</StyledBox>
	);
};

export default ProfilePageTablet;

import React, { useState } from 'react';
import styled from 'styled-components';
import Category from '@components/profile/Category';
import Navigation from '@components/common/Navigation';
import { useNavigate, useParams } from 'react-router-dom';
import MyFreeboard from '@components/profile/MyFreeboard';
import MyEureka from '@components/profile/MyEureka';
import MyProfile from '@components/profile/MyProfile';
import { images } from '@constants/images';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
// import { UserType } from '@typedef/common.types';

const StyledProfilePage = styled.div``;

const StyledProfileHigh = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 20px;
	position: relative;
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
	font-size: 20px;
	gap: 4px;

	div {
		height: 25px;
		margin-bottom: 5px;
	}
	.user-follow {
		display: flex;
		justify-content: center;
	}
`;
const StyledFollowing = styled.div`
	cursor: pointer;
	/* background-color: aquamarine; */
	width: 100px;
`;
const StyledFollower = styled.div`
	cursor: pointer;
	width: 100px;
`;

// 버튼 스타일
const StyledMyButton = styled.div`
	padding: 0 20px;
`;
const StyledUserButton = styled.div`
	display: flex;
	width: 100vw;
	padding: 0 20px;
	justify-content: space-between;
`;
const StyledActivityButton = styled.div`
	display: flex;
	position: absolute;
	right: 0;
	flex-direction: column;
	align-items: end;
`;
const StyledActivityButtonItem = styled.button`
	cursor: pointer;
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
	background-color: white;
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
	onClickGM: () => void;
	navigation: ReturnType<typeof useNavigate>;
	selectedMenu: string;
	// userData: UserType;
};

const ProfilePageMobile = ({
	handleMenuClick,
	onClickGM,
	navigation,
	selectedMenu,
}: ProfileProps) => {
	const { userId } = useParams();
	const user = useSelector((state: RootState) => state.user.user);
	const [view, setView] = useState(false);

	return (
		<StyledProfilePage>
			<StyledProfileHigh>
				<StyledUserProfile>
					<StyledUserImage src={user?.avatarUrl} alt="user_profile" />
					<StyledUserInformation>
						<div className="user-name">{user?.githubId}</div>
						<div className="user-follow">
							<StyledFollowing
								onClick={() =>
									navigation(`/profiles/${user?.githubId}/following`)
								}
							>
								{`팔로잉 20`}
							</StyledFollowing>
							<StyledFollower
								onClick={() =>
									navigation(`/profiles/${user?.githubId}/follower`)
								}
							>
								{`팔로워 20`}
							</StyledFollower>
						</div>
						{/* 이 부분은 누르면 드롭다운 느낌으로 보이도록 */}
						<div className="user-info">
							<p
								onClick={() => {
									setView(!view);
								}}
							>
								추가정보{' '}
								{view ? (
									<img src={images.arrowUpBlack} alt="up" />
								) : (
									<img src={images.arrowDownBlack} alt="down" />
								)}
							</p>
							{view && (
								<>
									{user?.name !== 'null' && <p>{user?.name}</p>}
									{user?.company !== 'null' && <p>{user?.company}</p>}
									{user?.location !== 'null' && <p>{user?.location}</p>}
									{user?.blog !== 'null' && <p>{user?.blog}</p>}
									{user?.bio !== 'null' && <p>{user?.bio}</p>}
								</>
							)}
						</div>
					</StyledUserInformation>
				</StyledUserProfile>

				{/* 내활동 | 팔로우,채팅,뒤로가기 버튼 */}
				<StyledActivityButton>
					{userId !== user?.githubId ? (
						<StyledUserButton>
							<div>
								<StyledActivityButtonItem onClick={() => navigation(-1)}>
									<img src={images.header.back} alt="뒤로가기" />
								</StyledActivityButtonItem>
							</div>
							<div>
								<StyledActivityButtonItem
									onClick={() => navigation(`/profiles/${user?.githubId}`)}
								>
									<img src={images.profile.followIcon} alt="팔로우" />
								</StyledActivityButtonItem>
								<StyledActivityButtonItem onClick={onClickGM}>
									<img src={images.gitMessage} alt="채팅" />
								</StyledActivityButtonItem>
							</div>
						</StyledUserButton>
					) : (
						<StyledMyButton>
							<StyledActivityButtonItem
								onClick={() =>
									navigation(`/profiles/${user?.githubId}/activity`)
								}
							>
								<img src={images.profile.settingIcon} alt="내활동" />
							</StyledActivityButtonItem>
						</StyledMyButton>
					)}
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
						{selectedMenu === '프로필' && user !== null && (
							<MyProfile user={user} />
						)}
						{selectedMenu === '유레카' && user !== null && (
							<MyEureka user={user} />
						)}
						{selectedMenu === '자유' && user !== null && (
							<MyFreeboard user={user} />
						)}
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

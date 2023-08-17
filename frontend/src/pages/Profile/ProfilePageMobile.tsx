import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Category from '@components/profile/Category';
import Navigation from '@components/common/Navigation';
import { useNavigate, useParams } from 'react-router-dom';
import MyFreeboard from './MyFreeboard';
import MyEureka from '@pages/Profile/MyEureka';
import MyProfile from './MyProfile';
import { images } from '@constants/images';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { authHttp } from '@utils/http';
import { UserType } from '@typedef/common.types';
import { FollowType } from '@typedef/profile/user.types';
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
	/* align-items: end; */
	margin-top: 40px;
	min-height: 150px;
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
	const [userInfo, setUserInfo] = useState(false);
	const [loadedUser, setLoadedUser] = useState<UserType>();
	const [isFollowing, setIsFollowing] = useState<boolean>();

	// 유저 정보 불러오기
	useEffect(() => {
		authHttp
			.get<UserType>(`users/${userId}`)
			.then((response) => {
				console.log('유저 정보 성공:', response);
				setLoadedUser(response);

				// 추가 정보가 있을 경우에만 view를 true로 설정
				if (
					response.name !== 'null' ||
					response.bio !== 'null' ||
					response.company !== 'null' ||
					response.location !== 'null' ||
					response.blog !== ''
				) {
					setUserInfo(true);
				}
			})
			.catch((error) => {
				console.error('유저 정보 실패:', error);
			});
	}, []);

	// 팔로우 상태 확인
	useEffect(() => {
		authHttp
			.get<FollowType>(`relations/state?to=${userId}`)
			.then((response) => {
				console.log('팔로우 정보 성공:', response);
				setIsFollowing(response.follow);
			})
			.catch((error) => {
				console.error('팔로우 정보 실패:', error);
			});
	}, []);

	// 유저 팔로우/언팔로우
	const handleFollowClick = () => {
		if (isFollowing !== undefined) {
			console.log('버튼 클릭 시 팔로우 상태 :', isFollowing);
			if (!isFollowing) {
				// 팔로우
				authHttp
					.post(`relations/follow?to=${userId}`)
					.then(() => {
						console.log('팔로우 성공: ', isFollowing);
						setIsFollowing(true);
					})
					.catch((error) => {
						console.error('팔로우 실패:', error);
					});
			} else {
				// 언팔로우
				authHttp
					.delete(`relations/unfollow?to=${userId}`)
					.then(() => {
						console.log('언팔로우 성공: ', isFollowing);
						setIsFollowing(false);
					})
					.catch((error) => {
						console.error('언팔로우 실패', error);
					});
			}
		}
	};

	return (
		<StyledProfilePage>
			<StyledProfileHigh>
				<StyledUserProfile>
					<StyledUserImage src={loadedUser?.avatarUrl} alt="user_profile" />
					<StyledUserInformation>
						<div className="user-name">{loadedUser?.githubId}</div>
						<div className="user-follow">
							<StyledFollowing
								onClick={() => navigation(`/profiles/${userId}/following`)}
							>
								<div>팔로잉</div>
							</StyledFollowing>
							<StyledFollower
								onClick={() => navigation(`/profiles/${userId}/follower`)}
							>
								<div>팔로워</div>
							</StyledFollower>
						</div>
						{/* 유저 정보 */}
						{/* 이 부분은 누르면 드롭다운 느낌으로 보이도록 */}
						{userInfo && (
							<div className="user-info">
								<div
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
								</div>
								{view && (
									<div>
										{loadedUser?.name !== 'null' && <p>{loadedUser?.name}</p>}
										{loadedUser?.company !== 'null' && (
											<p>{loadedUser?.company}</p>
										)}
										{loadedUser?.location !== 'null' && (
											<p>{loadedUser?.location}</p>
										)}
										{loadedUser?.blog !== 'null' && <p>{loadedUser?.blog}</p>}
										{loadedUser?.bio !== 'null' && <p>{loadedUser?.bio}</p>}
									</div>
								)}
							</div>
						)}
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
								<StyledActivityButtonItem onClick={handleFollowClick}>
									{isFollowing ? (
										<img src={images.profile.followingIcon} alt="팔로잉" />
									) : (
										<img src={images.profile.followIcon} alt="팔로우" />
									)}
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
			{loadedUser && (
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
								<MyProfile loadedUser={loadedUser} user={user} />
							)}
							{selectedMenu === '유레카' && user !== null && (
								<MyEureka user={loadedUser} />
							)}
							{selectedMenu === '자유' && user !== null && (
								<MyFreeboard user={loadedUser} />
							)}
						</StyledProfileLow>
					</Sdiv>
				</SboxTop>
			)}
			{userId === user?.githubId ? (
				<StyledFooter>
					<Navigation />
				</StyledFooter>
			) : (
				<></>
			)}
		</StyledProfilePage>
	);
};

export default ProfilePageMobile;

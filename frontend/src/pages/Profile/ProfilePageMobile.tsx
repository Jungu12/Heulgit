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
import { UserFollowingType } from '@typedef/profile/user.types';

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

type StyledUserInfoBoxProps = {
	$view: boolean;
};
const StyledUserInfoBox = styled.div<StyledUserInfoBoxProps>`
	height: ${(props) => (props.$view ? 'auto' : '0')};
	font-size: 16px;
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
	const [followerData, setFollowerData] = useState<number>();
	const [followingData, setFollowingData] = useState<number>();

	// 깃허브 열기
	const goGithub = () => {
		const githubUrl = `https://github.com/${userId}`;
		window.open(githubUrl, '_blank');
	};

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

	// 팔로잉 팔로워 정보 불러오기
	useEffect(() => {
		authHttp
			.get<UserFollowingType[]>(`relations/followings/${userId}`)
			.then((response) => {
				console.log('팔로잉 로드 성공.', userId, response);
				setFollowingData(response.length); // 받아온 데이터의 followings 배열을 상태에 저장
			})
			.catch((error) => {
				console.error('팔로잉 로드 실패.', error);
			});
	}, []);
	useEffect(() => {
		authHttp
			.get<UserFollowingType[]>(`relations/followers/${userId}`)
			.then((response) => {
				console.log('팔로워 로드 성공.', userId, response);
				setFollowerData(response.length); // 받아온 데이터의 followers 배열을 상태에 저장
			})
			.catch((error) => {
				console.error('팔로워 로드 실패.', error);
			});
	}, []);

	// 팔로우 상태 확인
	useEffect(() => {
		authHttp
			.get<boolean>(`relations/state?to=${userId}`)
			.then((response) => {
				console.log('팔로우 정보 성공:', response);
				setIsFollowing(response);
			})
			.catch((error) => {
				console.error('팔로우 정보 실패:', error);
			});
	}, []);

	// 유저 팔로우/언팔로우
	const handleFollowClick = () => {
		console.log('버튼 클릭 시 팔로우 상태1 :', isFollowing);
		if (isFollowing !== undefined) {
			console.log('버튼 클릭 시 팔로우 상태2 :', isFollowing);
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
				{/* 유저 프로필 */}
				<StyledUserProfile>
					<StyledUserImage src={loadedUser?.avatarUrl} alt="user_profile" />
					<StyledUserInformation>
						<div className="user-name">
							{loadedUser?.githubId}
							{'  '}
							{userId !== user?.githubId ? (
								<img
									src={images.profile.githubIcon}
									alt="깃허브"
									onClick={goGithub}
									style={{ cursor: 'pointer', width: '18px', height: '18px' }}
								/>
							) : (
								<></>
							)}
						</div>

						<div className="user-follow">
							<StyledFollowing
								onClick={() => navigation(`/profiles/${userId}/following`)}
							>
								<div>팔로잉 {followingData}</div>
							</StyledFollowing>
							<StyledFollower
								onClick={() => navigation(`/profiles/${userId}/follower`)}
							>
								<div>팔로워 {followerData}</div>
							</StyledFollower>
						</div>
						{/* 유저 정보 */}
						{userInfo && (
							<StyledUserInfoBox $view={view}>
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
							</StyledUserInfoBox>
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
							{selectedMenu === '유레카' && user !== null && <MyEureka />}
							{selectedMenu === '자유' && user !== null && <MyFreeboard />}
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

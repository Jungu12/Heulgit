import RankingGraph from '@components/profile/RankingGraph';
import CommitGraph from '@components/profile/CommitGraph';
import Category from '@components/profile/Category';
import Navigation from '@components/common/Navigation';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import CommitTable from '@components/profile/CommitTable';

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
	/* justify-content: flex-start; */
	/* align-items: flex-start; */
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
const StyledCommitBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	border: 1px solid;
	border-radius: 10px;
	width: 100%;
	margin-bottom: 20px;
`;
const StyledDiv = styled.div`
	display: flex;
	justify-content: center;
	width: 80vw;
`;
const StyledCommitRank = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid;
	border-radius: 10px;
	width: 100%;
	height: 300px;
`;

const StyledFooter = styled.div`
	height: 70px;
`;

const ProfilePage = () => {
	const navigation = useNavigate();

	const commitLabels = [
		'commit tag 1',
		'commit tag 2',
		'commit tag 3',
		'commit tag 4',
		'commit tag 5',
		'commit tag 6',
		'commit tag 7',
	];

	const commitInfos = [
		{ type: 'feat', count: 50 },
		{ type: 'fix', count: 10 },
		{ type: 'algo', count: 75 },
		{ type: 'style', count: 20 },
		{ type: 'docs', count: 15 },
		{ type: 'study', count: 5 },
	];

	return (
		<div>
			<StyledProfileHigh>
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
				menuRouter1={''}
				menu2={'유레카'}
				menuRouter2={'2'}
				// 작성한 유레카 페이지로 수정해야 함
				menu3={'자유'}
				menuRouter3={'3'}
			/>
			<StyledProfileLow>
				<StyledCommitBox>
					<StyledActivityButton
						onClick={() => navigation('/profiles/1/commit-edit')}
					>
						설정
					</StyledActivityButton>
					<StyledDiv>
						<CommitGraph labels={commitLabels} />
					</StyledDiv>
					<StyledDiv>
						<CommitTable commitTag={commitInfos} />
					</StyledDiv>
				</StyledCommitBox>

				<StyledCommitRank>
					<RankingGraph></RankingGraph>
				</StyledCommitRank>
			</StyledProfileLow>
			<StyledFooter>
				<Navigation />
			</StyledFooter>
		</div>
	);
};

export default ProfilePage;

import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import CommitTable from '@components/profile/CommitTable';
import RankingGraph from '@components/profile/RankingGraph';
import CommitGraph from '@components/profile/CommitGraph';
import { useNavigate } from 'react-router-dom';
import { images } from '@constants/images';
import { colors } from '@constants/colors';
import { UserType } from '@typedef/common.types';
import { authHttp } from '@utils/http';
import { UserCommitType, UserRankingType } from '@typedef/profile/user.types';

//전체 컨테이너
const StyledBox = styled.div`
	width: 100%;
`;

// 커밋 그래프
const StyledCommitBox = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid;
	border-radius: 10px;
	margin-bottom: 20px;
	padding: 20px;
`;
const StyledCommitList = styled.div`
	/* 타블렛 이상이면 적용 */
	@media (min-width: 768px) {
		display: flex;
	}
`;
const StyledCommitItem = styled.div`
	@media (min-width: 768px) {
		width: 50%;
	}
`;
const StyledActivityButton = styled.button`
	cursor: pointer;
	background-color: transparent;
	img {
		width: 20px;
		height: auto;
	}
	margin-left: auto;
`;

// 랭킹 그래프
const StyledRankBox = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid;
	border-radius: 10px;
	padding: 20px;
	align-items: center;
`;
const StyledTitle = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const StyledTitleItem = styled.div`
	display: flex;
	justify-content: start;
	align-items: center;
	margin-right: auto;
	img {
		height: 24px;
	}
	div {
		margin: 0 5px;
	}
`;
const StyledTitleButton = styled.div`
	button {
		cursor: pointer;
		background-color: transparent;
		margin-left: 10px;
		color: ${colors.primary.primatyDark};
	}
`;

type MyProfileProps = {
	user: UserType;
};

const MyProfile = ({ user }: MyProfileProps) => {
	const navigation = useNavigate();
	const tags = ['feat', 'fix', 'algo', 'style', 'docs', 'study', 'chore'];

	const [commitGraphData, setCommitGraphData] = useState<UserCommitType[]>();
	const [commitRankingData, setCommitRankingData] = useState<UserRankingType[]>(
		[],
	);
	const [currentTagIndex, setCurrentTagIndex] = useState(0);

	const handlePrevTag = () => {
		setCurrentTagIndex((currentTagIndex + 6) % tags.length);
	};
	const handleNextTag = () => {
		setCurrentTagIndex((currentTagIndex + 1) % tags.length);
	};

	useEffect(() => {
		authHttp
			.get<UserCommitType[]>(`users/commit-analyze/${user.githubId}`)
			.then((response) => {
				// console.log('커밋 분석 정보를 불러왔습니다.', response);
				setCommitGraphData(response);
			})
			.catch((error) => {
				console.error('커밋 분석 정보를 불러오지 못했습니다.', error);
			});
	}, []);

	// 커밋 랭킹 불러오기
	useEffect(() => {
		authHttp
			.get<UserRankingType[]>(`users/ranking?type=${tags[currentTagIndex]}`)
			.then((response) => {
				console.log(
					'커밋 랭킹을 불러왔습니다.',
					tags[currentTagIndex],
					response,
				);
				setCommitRankingData(response);
			})
			.catch((error) => {
				console.error('커밋 랭킹을 불러오지 못했습니다.', error);
			});
	}, [currentTagIndex]);

	return (
		<StyledBox>
			<StyledCommitBox>
				<StyledActivityButton
					onClick={() => navigation(`/profiles/${user?.githubId}/commit-edit`)}
				>
					<img src={images.profile.settingIcon} alt="설정" />
				</StyledActivityButton>
				{commitGraphData !== undefined ? (
					<StyledCommitList>
						<StyledCommitItem>
							<CommitGraph
								labels={commitGraphData.map((data) => data.type)}
								datas={commitGraphData.map((data) => data.count)}
							/>
						</StyledCommitItem>
						<StyledCommitItem>
							<CommitTable commitTag={commitGraphData} />
						</StyledCommitItem>
					</StyledCommitList>
				) : (
					<p>Loading...</p>
				)}
			</StyledCommitBox>

			<StyledRankBox>
				<StyledTitle>
					<StyledTitleItem>
						<img src={images.profile.rankingIcon} alt="팔로우" />
						<div className="ranking-title">열심히 하시잖아</div>
						<div className="ranking-tag">{tags[currentTagIndex]}</div>
					</StyledTitleItem>
					<StyledTitleButton>
						<button onClick={handlePrevTag}> ◀ </button>
						<button onClick={handleNextTag}> ▶ </button>
					</StyledTitleButton>
				</StyledTitle>
				{commitGraphData !== undefined ? (
					<RankingGraph rankingList={commitRankingData} />
				) : (
					<p>Loading...</p>
				)}
			</StyledRankBox>
		</StyledBox>
	);
};

export default MyProfile;
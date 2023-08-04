import React from 'react';
import { styled } from 'styled-components';
import CommitTable from '@components/profile/CommitTable';
import RankingGraph from '@components/profile/RankingGraph';
import CommitGraph from '@components/profile/CommitGraph';
import { useNavigate } from 'react-router-dom';
import { images } from '@constants/images';

// 더미 데이터
const dummyRankingList = [
	{
		github_id: 'bbong-sil',
		count: 37,
	},
	{
		github_id: 'kim.sg',
		count: 152,
	},
	{
		github_id: 'klb',
		count: 89,
	},
	{
		github_id: 'nabi',
		count: 6,
	},
	{
		github_id: 'siri',
		count: 72,
	},
	{
		github_id: 'summer',
		count: 93,
	},
];
// 더미 데이터 끝

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
const SytledTitle = styled.div`
	display: flex;
	justify-content: start;
	align-items: center;
	img {
		height: 24px;
	}
`;

const MyProfile = () => {
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
		<StyledBox>
			<StyledCommitBox>
				<StyledActivityButton
					onClick={() => navigation('/profiles/1/commit-edit')}
				>
					<img src={images.profile.settingIcon} alt="설정" />
				</StyledActivityButton>
				<StyledCommitList>
					<StyledCommitItem>
						<CommitGraph labels={commitLabels} />
					</StyledCommitItem>
					<StyledCommitItem>
						<CommitTable commitTag={commitInfos} />
					</StyledCommitItem>
				</StyledCommitList>
			</StyledCommitBox>

			<StyledRankBox>
				<SytledTitle>
					<img src={images.profile.rankingIcon} alt="팔로우" />
					<div className="ranking-title">열심히 하시잖아</div>
					<div className="ranking-tag">feat</div>
				</SytledTitle>
				<RankingGraph rankingList={dummyRankingList} />
			</StyledRankBox>
		</StyledBox>
	);
};

export default MyProfile;

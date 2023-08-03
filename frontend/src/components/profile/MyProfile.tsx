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

const StyledCommitBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	border: 1px solid;
	border-radius: 10px;
	margin-bottom: 20px;
`;
const StyledWrap = styled.div`
	width: 100%;
`;
const StyledDiv = styled.div`
	display: flex;
	justify-content: center;
	width: 80vw;
`;
const StyledCommitRank = styled.div`
	display: flex;
	flex-direction: column;
	/* justify-content: center; */
	align-items: center;
	border: 1px solid;
	border-radius: 10px;
	width: 100%;
	/* height: 250px; */
	padding: 20px;
`;
const StyledActivityButton = styled.button`
	background-color: transparent;
	img {
		width: 20px;
		height: auto;
	}
	margin-left: auto;
	padding: 10px;
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
		<StyledWrap>
			<StyledCommitBox>
				<StyledActivityButton
					onClick={() => navigation('/profiles/1/commit-edit')}
				>
					<img src={images.profile.settingIcon} alt="설정" />
				</StyledActivityButton>
				<StyledDiv>
					<CommitGraph labels={commitLabels} />
				</StyledDiv>
				<StyledDiv>
					<CommitTable commitTag={commitInfos} />
				</StyledDiv>
			</StyledCommitBox>

			<StyledCommitRank>
				<div>열심히 하셨잖아</div>
				<RankingGraph rankingList={dummyRankingList} />
			</StyledCommitRank>
		</StyledWrap>
	);
};

export default MyProfile;

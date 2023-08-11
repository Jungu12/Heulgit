import React, { useState } from 'react';
import { styled } from 'styled-components';
import CommitTable from '@components/profile/CommitTable';
import RankingGraph from '@components/profile/RankingGraph';
import CommitGraph from '@components/profile/CommitGraph';
import { useNavigate } from 'react-router-dom';
import { images } from '@constants/images';
import { colors } from '@constants/colors';
import { UserType } from '@typedef/common.types';

// 더미 데이터
const dummyRankingList1 = [
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
const dummyRankingList2 = [
	{
		github_id: 'bbong-sil',
		count: 37,
	},
	{
		github_id: 'kim.sg',
		count: 142,
	},
	{
		github_id: 'klb',
		count: 89,
	},
	{
		github_id: 'nabi',
		count: 56,
	},
	{
		github_id: 'siri',
		count: 372,
	},
	{
		github_id: 'summer',
		count: 93,
	},
];
const dummyRankingList3 = [
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
const dummyRankingList4 = [
	{
		github_id: 'bbong-sil',
		count: 137,
	},
	{
		github_id: 'kim.sg',
		count: 52,
	},
	{
		github_id: 'klb',
		count: 9,
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
		count: 43,
	},
];
const dummyRankingList5 = [
	{
		github_id: 'bbong-sil',
		count: 97,
	},
	{
		github_id: 'kim.sg',
		count: 182,
	},
	{
		github_id: 'klb',
		count: 9,
	},
	{
		github_id: 'nabi',
		count: 6,
	},
	{
		github_id: 'siri',
		count: 2,
	},
	{
		github_id: 'summer',
		count: 93,
	},
];
const dummyRankingList6 = [
	{
		github_id: 'bbong-sil',
		count: 7,
	},
	{
		github_id: 'kim.sg',
		count: 12,
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
		count: 2,
	},
	{
		github_id: 'summer',
		count: 3,
	},
];
const dummyRankingList7 = [
	{
		github_id: 'bbong-sil',
		count: 37,
	},
	{
		github_id: 'kim.sg',
		count: 12,
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
		count: 193,
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
		{ type: 'chore', count: 8 },
	];

	const [currentTagIndex, setCurrentTagIndex] = useState(0);
	const tags = ['feat', 'fix', 'algo', 'style', 'docs', 'study', 'chore'];
	const handlePrevTag = () => {
		setCurrentTagIndex((currentTagIndex + 6) % tags.length);
	};
	const handleNextTag = () => {
		setCurrentTagIndex((currentTagIndex + 1) % tags.length);
	};

	// dummyRankingList를 선택된 태그에 따라 변경
	const getDummyRankingList = (tag: string) => {
		switch (tag) {
			case 'feat':
				return dummyRankingList1;
			case 'fix':
				return dummyRankingList2;
			case 'algo':
				return dummyRankingList3;
			case 'style':
				return dummyRankingList4;
			case 'docs':
				return dummyRankingList5;
			case 'study':
				return dummyRankingList6;
			case 'chore':
				return dummyRankingList7;
			default:
				return [];
		}
	};

	return (
		<StyledBox>
			<StyledCommitBox>
				<StyledActivityButton
					onClick={() => navigation(`/profiles/${user?.githubId}/commit-edit`)}
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
				<RankingGraph
					rankingList={getDummyRankingList(tags[currentTagIndex])}
				/>
			</StyledRankBox>
		</StyledBox>
	);
};

export default MyProfile;

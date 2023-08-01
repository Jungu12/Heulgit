import React from 'react';
import { styled } from 'styled-components';
import CommitTable from '@components/profile/CommitTable';
import RankingGraph from '@components/profile/RankingGraph';
import CommitGraph from '@components/profile/CommitGraph';
import { useNavigate } from 'react-router-dom';

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
const StyledActivityButton = styled.button`
	height: 25px;
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
		<div>
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
		</div>
	);
};

export default MyProfile;

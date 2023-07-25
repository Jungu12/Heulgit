import Header from '@components/common/Header';
import Navigation from '@components/common/Navigation';
import CommunityCategory from '@components/community/CommunityCategory';
import CreateButton from '@components/community/CreateButton';
import FilterCategory from '@components/community/FilterCategory';
import { images } from '@constants/images';
import React from 'react';
import styled from 'styled-components';

// 커뮤니티
const CommunityBlock = styled.div``;

// 피드
const Feed = styled.div`
	display: flex;
	justify-content: center;
	height: 700px;
	/* border: solid 1px #999999; */
`;

const StyledSearchButton = styled.img`
	height: 24px;
	width: 24px;
	margin-right: 14px;
`;

const CommunityPage = () => {
	return (
		<CommunityBlock>
			<Header title="커뮤니티">
				<StyledSearchButton
					src={images.navigation.searchActive}
					alt="search button"
				/>
			</Header>
			<CommunityCategory />
			<FilterCategory />
			<Feed>
				<p>피드입니다</p>
			</Feed>
			<CreateButton />
			<Navigation />
		</CommunityBlock>
	);
};

export default CommunityPage;

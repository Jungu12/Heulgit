import TabletNavigation from '@components/common/TabletNavigation';
import React from 'react';
import { styled } from 'styled-components';

const StyledMainContainer = styled.div`
	position: relative;
	display: flex;
	height: calc(var(--vh, 1vh) * 100);
`;

const MainPageTablet = () => {
	return (
		<StyledMainContainer>
			<TabletNavigation />
		</StyledMainContainer>
	);
};

export default MainPageTablet;

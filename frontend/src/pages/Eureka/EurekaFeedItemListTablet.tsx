import React from 'react';
import { styled } from 'styled-components';
import { colors } from '@constants/colors';
import { EurekaPostType } from '@typedef/community/eureka.types';
import EurekaFeedItem from '../../components/community/EurekaFeedItem';

const StyledFeedListSection = styled.section`
	overflow-y: scroll;
	scrollbar-width: none; /* 파이어폭스 */
	/* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
	&::-webkit-scrollbar {
		display: none;
	}
`;

const Separation = styled.div`
	height: 1px;
	width: 100%;
	background-color: ${colors.greyScale.grey2};
	margin-top: 12px;
`;

type Props = {
	feedList: EurekaPostType[];
};

const EurekaFeedItemListTablet = ({ feedList }: Props) => {
	return (
		<StyledFeedListSection>
			{feedList.map((feed, index) => (
				<div key={index}>
					<EurekaFeedItem feed={feed} />
					<Separation />
				</div>
			))}
		</StyledFeedListSection>
	);
};

export default EurekaFeedItemListTablet;

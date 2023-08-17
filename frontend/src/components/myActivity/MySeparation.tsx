import React from 'react';
import { colors } from '@constants/colors';
import { styled } from 'styled-components';

const StyledSeparation = styled.div`
	height: 1px;
	width: 100%;
	background-color: ${colors.greyScale.grey2};
	margin-top: 12px;
`;

const MySeparation = () => {
	return <StyledSeparation />;
};

export default MySeparation;

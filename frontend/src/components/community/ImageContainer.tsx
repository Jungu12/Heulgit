import { colors } from '@constants/colors';
import React from 'react';
import styled from 'styled-components';

const StyledImgContainer = styled.div`
	display: flex;
	position: relative;
	justify-content: center;

	width: 100%;
	top: 20px;
`;

const StyledImg = styled.img`
	width: calc(100vw - 60px);
	height: 220px;
	background-color: ${colors.greyScale.grey4};

	border-radius: 20px;
	border: none;
`;

const ImageContainer = () => {
	return (
		<StyledImgContainer>
			<StyledImg />
		</StyledImgContainer>
	);
};

export default ImageContainer;

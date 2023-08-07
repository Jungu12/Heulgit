import { colors } from '@constants/colors';
import React from 'react';
import styled from 'styled-components';

const StyledImgContainer = styled.div`
	display: flex;
	position: relative;
	justify-content: center;
	align-items: center;

	width: 100%;
	height: 100%;
`;

const StyledImg = styled.img`
	width: calc(100vw - 60px);
	height: 200px;
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

import { colors } from '@constants/colors';
import { images } from '@constants/images';
import React from 'react';
import { styled } from 'styled-components';

const StyledAddImgButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	bottom: 40px;
	right: 40px;

	width: 70px;
	height: 70px;
	border: none;
	border-radius: 50%;
	background-color: ${colors.primary.primary};

	padding: 0;
	background-image: url(${images.community.addImg});
	background-size: 60%;
	background-repeat: no-repeat;
	background-position: center;
`;

const AddImgButton = () => {
	return <StyledAddImgButton />;
};

export default AddImgButton;

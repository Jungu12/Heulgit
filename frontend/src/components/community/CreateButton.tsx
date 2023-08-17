import { colors } from '@constants/colors';
import { images } from '@constants/images';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const StyledCreateButton = styled.button`
	display: flex;
	position: fixed;
	bottom: 100px;
	right: 40px;

	width: 70px;
	height: 70px;
	border: none;
	border-radius: 50%;
	background-color: ${colors.primary.primary};

	padding: 0;
	background-image: url(${images.community.createPost});
	background-size: 60%;
	background-repeat: no-repeat;
	background-position: center;
	cursor: pointer;
`;

const CreateButton = () => {
	const navigation = useNavigate();
	return (
		<StyledCreateButton onClick={() => navigation('/community/free/post')} />
	);
};

export default CreateButton;

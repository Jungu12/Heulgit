import { colors } from '@constants/colors';
import { images } from '@constants/images';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const StyledHeaderContainer = styled.div`
	position: fixed;
	top: 0;
	display: flex;
	z-index: 99;
	width: 100%;
	height: 56px;
	align-items: center;
	justify-content: center;
	background-color: white;
	border-bottom: 1px solid ${colors.greyScale.grey3};
`;

const StyledBackButton = styled.img`
	position: absolute;
	height: 24px;
	width: 24px;
	left: 18px;
	top: 16px;
`;

const StyledTitle = styled.h2`
	text-align: center;
	font-size: 16px;
	font-weight: 700;
	right: 50%;
	top: 16px;
`;

const StyledChildContainer = styled.div`
	position: absolute;
	right: 0;
`;

type Props = {
	title: string;
	children?: React.ReactNode;
	type?: 'home';
	onClickBackButton?: () => void;
};

const Header = ({ title, children, onClickBackButton, type }: Props) => {
	const navigation = useNavigate();

	return (
		<StyledHeaderContainer>
			<StyledTitle>{title}</StyledTitle>
			{type !== 'home' && (
				<StyledBackButton
					onClick={
						onClickBackButton ??
						(() => {
							navigation(-1);
						})
					}
					src={images.header.back}
					alt="back button"
				/>
			)}
			<StyledChildContainer>{children}</StyledChildContainer>
		</StyledHeaderContainer>
	);
};

export default Header;

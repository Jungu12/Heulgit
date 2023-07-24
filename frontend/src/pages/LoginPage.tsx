import { colors } from '@constants/colors';
import { images } from '@constants/images';
import React from 'react';
import { styled } from 'styled-components';

const StyledLoginContainer = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const StyledLogo = styled.img`
	width: 279px;
	height: 279px;
	margin-top: 66px;
`;

const StyledContent = styled.div`
	font-family: 'RixYeoljeongdo_Regular';
	font-size: 28px;
	line-height: 40px;
	margin-top: 70px;
	text-align: center;
	white-space: pre-wrap;
`;

const StyledGitLoginButtonContainer = styled.div`
	display: flex;
	width: 353px;
	align-items: center;
	background-color: black;
	color: white;
	margin-top: 24px;
	padding: 19px 0;
	border-radius: 8px;

	p {
		font-size: 20px;
		font-weight: 700;
	}

	img {
		margin-left: 47px;
		margin-right: 24px;
	}
`;

const StyledAppName = styled.p`
	color: ${colors.primary.primary};
	font-family: 'RixYeoljeongdo_Regular';
	font-size: 18px;
	margin-top: auto;
	margin-bottom: 12px;
`;

const LoginPage = () => {
	return (
		<StyledLoginContainer>
			<StyledLogo src={images.logo} alt="logo" />
			<StyledContent>{`깃 계정으로 로그인하고\n 새로운 세상을 경험해보세요`}</StyledContent>
			<StyledGitLoginButtonContainer>
				<img src={images.gitLogo} alt="git-logo" />
				<p>GitHub로 로그인하기</p>
			</StyledGitLoginButtonContainer>
			<StyledAppName>흘깃</StyledAppName>
		</StyledLoginContainer>
	);
};

export default LoginPage;

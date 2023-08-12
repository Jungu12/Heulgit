import { colors } from '@constants/colors';
import { images } from '@constants/images';
import React from 'react';
import { styled } from 'styled-components';
// eslint-disable-next-line import/no-extraneous-dependencies
import Lottie from 'lottie-react';
import catUp from '../../animation_lkrkgwed.json';

const StyledLoginContainer = styled.div`
	position: relative;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: linear-gradient(
		45deg,
		#495c83 16.13%,
		rgba(73, 92, 131, 0.41) 100%
	);
`;

const StyledLogo = styled.img`
	width: 280px;
	height: 280px;
	margin-top: 69px;
`;

const StyledContentSection = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	/* height: 824px; */
	width: 580px;
	background-color: ${colors.primary.primary};
	box-shadow: 10px 10px 30px 0px rgba(0, 0, 0, 0.25);
	border-radius: 36px;
	margin-top: 36px;
`;

const StyledContent = styled.div`
	font-family: 'RixYeoljeongdo_Regular';
	font-size: 32px;
	line-height: 40px;
	margin-top: 66px;
	text-align: center;
	white-space: pre-wrap;
	color: white;
`;

const StyledGitLoginButton = styled.button`
	z-index: 1;
	cursor: pointer;
	display: flex;
	width: 353px;
	align-items: center;
	background-color: black;
	color: white;
	margin-top: 40px;
	padding: 19px 0;
	border-radius: 8px;
	margin-bottom: 40px;

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
	color: white;
`;

const StyledLottieContainer = styled.div`
	position: absolute;
	bottom: 0;
	right: calc(100% -24px);
`;

type Props = {
	onClickLoginButton: () => void;
};

const LoginPageTablet = ({ onClickLoginButton }: Props) => {
	return (
		<StyledLoginContainer>
			<StyledContentSection>
				<StyledLogo src={images.logo} alt="logo" />
				<StyledContent>{`깃 계정으로 로그인하고\n 새로운 세상을 경험해보세요`}</StyledContent>
				<StyledGitLoginButton onClick={onClickLoginButton}>
					<img src={images.gitLogo} alt="git-logo" />
					<p>GitHub로 로그인하기</p>
				</StyledGitLoginButton>
			</StyledContentSection>
			<StyledAppName>흘깃</StyledAppName>
			<StyledLottieContainer>
				<Lottie
					animationData={catUp}
					loop={true}
					style={{ width: '133px', height: '200px' }}
				/>
			</StyledLottieContainer>
		</StyledLoginContainer>
	);
};

export default LoginPageTablet;

import { colors } from '@constants/colors';
import { images } from '@constants/images';
import React from 'react';
import { styled } from 'styled-components';

const StyledLoginContainer = styled.div`
	position: relative;
	height: 100vh;
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
	width: 345px;
	height: 345px;
	margin-top: 50px;
`;

const StyledContentSection = styled.section`
	display: flex;
	align-items: center;
	width: 1060px;
	background-color: ${colors.primary.primary};
	box-shadow: 10px 10px 30px 0px rgba(0, 0, 0, 0.25);
	border-radius: 36px;
	margin-top: 36px;
`;

const StyledLogoContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: ${colors.primary.primatyDark};
	border-radius: 36px 0px 0px 36px;
	width: 530px;
`;

const StyledContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: ${colors.primary.primary};
`;

const StyledContent = styled.div`
	font-family: 'RixYeoljeongdo_Regular';
	font-size: 38px;
	line-height: 40px;
	text-align: center;
	white-space: pre-wrap;
	color: white;
	margin-top: 60px;
	padding: 0 16px;
	line-height: 1.5;
`;

const StyledGitLoginButton = styled.button`
	z-index: 1;
	cursor: pointer;
	display: flex;
	width: 353px;
	align-items: center;
	background-color: black;
	color: white;
	margin-top: 49px;
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
	font-size: 32px;
	margin-top: 56px;
	margin-bottom: 93px;
	color: white;
`;

type Props = {
	onClickLoginButton: () => void;
};

const LoginPageWeb = ({ onClickLoginButton }: Props) => {
	return (
		<StyledLoginContainer>
			<StyledContentSection>
				<StyledLogoContentContainer>
					<StyledLogo src={images.logo} alt="logo" />
					<StyledAppName>흘깃</StyledAppName>
				</StyledLogoContentContainer>
				<StyledContentContainer>
					<StyledContent>{`깃 계정으로 로그인하고\n 새로운 세상을 경험해보세요`}</StyledContent>
					<StyledGitLoginButton onClick={onClickLoginButton}>
						<img src={images.gitLogo} alt="git-logo" />
						<p>GitHub로 로그인하기</p>
					</StyledGitLoginButton>
				</StyledContentContainer>
			</StyledContentSection>
		</StyledLoginContainer>
	);
};

export default LoginPageWeb;

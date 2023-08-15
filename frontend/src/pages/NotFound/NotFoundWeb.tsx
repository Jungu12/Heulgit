// eslint-disable-next-line import/no-extraneous-dependencies
import Lottie from 'lottie-react';
import React from 'react';
import { styled } from 'styled-components';
import NotFoundLottie from '../../NotFound.json';
import { colors } from '@constants/colors';

const NotFoundContainer = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 32px;
	flex-direction: column;

	.lottie {
		width: 60%;
		height: 60%;
	}
`;

const NotFoundText = styled.p`
	font-size: 20px;
	font-weight: 700;
	line-height: 1.6;
	color: ${colors.primary.primatyDark};
	white-space: pre-wrap;
	text-align: center;
`;

const NotFoundSubText = styled.p`
	font-size: 16px;
	font-weight: 500;
	line-height: 1.6;
	color: ${colors.primary.primary};
	white-space: pre-wrap;
	text-align: center;
	margin-top: 12px;
`;

const ButtonContainer = styled.div`
	display: flex;
	margin-top: 40px;
`;

const GoHomeButton = styled.button`
	padding: 12px 16px;
	font-size: 18px;
	font-weight: 700;
	background-color: white;
	border: 2px solid ${colors.primary.primary};
	color: ${colors.primary.primary};
	border-radius: 16px;
	cursor: pointer;
	margin-left: 16px;

	&:hover {
		border: 2px solid ${colors.primary.primary};
		background-color: ${colors.primary.primary};
		color: white;
	}
`;

const GoBackButton = styled.button`
	padding: 12px 16px;
	font-size: 18px;
	font-weight: 700;
	background-color: white;
	border: 2px solid ${colors.primary.primary};
	color: ${colors.primary.primary};
	border-radius: 16px;
	cursor: pointer;

	&:hover {
		border: 2px solid ${colors.primary.primary};
		background-color: ${colors.primary.primary};
		color: white;
	}
`;

type Props = {
	onClickBack: () => void;
	onClickHome: () => void;
};

const NotFoundWeb = ({ onClickBack, onClickHome }: Props) => {
	return (
		<NotFoundContainer>
			<Lottie animationData={NotFoundLottie} loop={true} className="lottie" />
			<NotFoundText>{`죄송합니다. 현재 찾을 수 없는 페이지를 요청하셨습니다.`}</NotFoundText>
			<NotFoundSubText>{`존재하지 않는 주소를 입력하셨거나,\n요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.`}</NotFoundSubText>
			<ButtonContainer>
				<GoBackButton onClick={onClickBack}>뒤로 가기</GoBackButton>
				<GoHomeButton onClick={onClickHome}>홈으로 가기</GoHomeButton>
			</ButtonContainer>
		</NotFoundContainer>
	);
};

export default NotFoundWeb;

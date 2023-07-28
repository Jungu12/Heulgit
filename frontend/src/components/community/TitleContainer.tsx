import { colors } from '@constants/colors';
import React from 'react';
import { styled } from 'styled-components';

// 제목 컨테이너
const StyledTitleContainer = styled.div`
	display: flex;
	/* position: relative; */
	flex-direction: column;
	/* justify-content: center; */

	margin-top: 55px;
	height: 120px;
	width: 100%;

	border-top: solid 1px ${colors.greyScale.grey4};
	border-bottom: solid 1px ${colors.greyScale.grey4};
`;

// 제목
const StyledTitle = styled.div`
	display: flex;
	align-items: center;

	height: 80px;
	margin: 0 10px;

	font-size: 30px;
`;

// 유저 정보 컨테이너 (프로필 이미지 + (유저 네임 + 작성 시간 및 조회 수 디브))
const StyledInfoContainer = styled.div`
	display: flex;
	align-items: center;

	/* width: 100%; */
	height: 40px;
	margin: 0 0 5px 10px;
`;

// 프로필 이미지
const StyledProfileImg = styled.img`
	width: 36px;
	height: 36px;
	/* margin: 5px 0 0 5px; */
	background-color: #000000;
	/* margin-right: 10px; */

	border-radius: 50%;
`;

// 유저 네임(StyledUserName) + 작성 시간 및 조회 수 디브(StyledPostCreatedTime)
const StyledUserDiv = styled.div`
	height: 40px;

	margin-top: 10px;
`;

// 유저 네임
const StyledUserName = styled.div`
	/* display: flex; */

	margin: 0 0 0 10px;
	width: 73px;

	font-size: 15px;
	font-weight: bold;
`;

// 작성 시간 및 조회 수
const StyledPostCreatedTime = styled.div`
	/* display: flex; */

	margin: 4px 0 0 10px;
	width: 300px;

	font-size: 12px;
	color: ${colors.greyScale.grey4};
`;

const TitleContainer = () => {
	return (
		<StyledTitleContainer>
			<StyledTitle>이거슨 제목임니당 이거슨 제목임니당</StyledTitle>
			<StyledInfoContainer>
				<StyledProfileImg />
				<StyledUserDiv>
					<StyledUserName>Pposil</StyledUserName>
					<StyledPostCreatedTime>
						2023.07.19 13:06 · 조회수 77회
					</StyledPostCreatedTime>
				</StyledUserDiv>
			</StyledInfoContainer>
		</StyledTitleContainer>
	);
};

export default TitleContainer;

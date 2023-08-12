import AddImgButton from '@components/community/AddImgButton';
import ContentInput from '@components/community/ContentInput';
import ImageContainer from '@components/community/ImageContainer';
import TitleInput from '@components/community/TitleInput';
import { images } from '@constants/images';
import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '@constants/colors';
import { useNavigate } from 'react-router-dom';

// 자유게시판 작성 컨테이너 테블릿 PC
const StyledCreateFreePostContainerTabletPC = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	align-items: center;
	overflow: scroll;

	overflow-x: hidden;
	/* height: calc(100vh - 56px); */
	height: 574px;
	top: 56px;
	margin: 0;

	overflow-y: scroll;
	-ms-overflow-style: none; /* 인터넷 익스플로러 */
	scrollbar-width: none; /* 파이어폭스 */

	/* 스크롤바 숨기기 (인터넷 익스플로러, 파이어폭스 */
	&::-webkit-scrollbar {
		display: none; /* 크롬, 사파리, 엣지 */
	}
	&::-ms-scrollbar {
		display: none; /* 인터넷 익스플로러 */
	}
`;

// 글자 수 관련 컨테이너
const StyledContentLengthContainer = styled.div`
	display: flex;
	align-items: center;

	height: 50px;
	/* margin-top: 20px;
	margin-left: 30px; */
	padding-left: 15px;
	/* padding-top: 20px; */

	width: 100%;
	background-color: #ffffff;
`;

// 글자 수 이미지
const StyledContentLengthImg = styled.img`
	width: 20px;
	height: 20px;
`;

// 글자 수 p Tag
const StyledContentLengthP = styled.p`
	font-size: 15px;

	margin-left: 10px;
`;

// 헤더 컨테이너
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

// 헤더 제목
const StyledTitle = styled.h2`
	text-align: center;
	font-size: 16px;
	font-weight: 700;
	right: 50%;
	top: 16px;
`;

const StyledCloseButton = styled.button`
	position: absolute;
	left: 0;
	background-color: transparent;

	img {
		margin-left: 12px;
		width: 16px;
		height: 16px;
	}
`;
const StyledRegistButton = styled.button<{ isActive: boolean }>`
	position: absolute;
	right: 0;
	background-color: transparent;
	margin-right: 12px;

	p {
		font-weight: 500;
		color: ${({ isActive }) =>
			isActive ? colors.primary.primatyDark : colors.greyScale.grey4};
	}
`;

type Props = {
	closeModal: () => void;
};

const CreateFreePostModal = ({ closeModal }: Props) => {
	const navigation = useNavigate();
	const [contentLength, setContentLength] = useState(0);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const titleInputChangeHandler = (value: string) => {
		// 타이틀 인풋의 입력값을 콘솔에 출력
		console.log('title:', value);
		setTitle(value);
	};

	const contentInputChangeHandler = (value: string) => {
		// 타이틀 인풋의 입력값을 콘솔에 출력
		console.log('content:', value);
		setContent(value);
		setContentLength(value.length);
	};

	// 등록 버튼 활성화 여부를 결정하는 함수
	const isRegisterButtonEnabled =
		title.trim().length > 0 && content.trim().length > 0;

	// 등록 버튼이 활성화된 상태인지 여부를 판단합니다.
	const isActive = isRegisterButtonEnabled;

	const closeModalHandler = () => {
		closeModal(); // 부모 컴포넌트에서 전달받은 closeModal 함수를 호출하여 모달 닫기
	};

	return (
		<StyledCreateFreePostContainerTabletPC>
			<StyledHeaderContainer>
				<StyledTitle>자유 게시판 게시물 작성</StyledTitle>
				<StyledCloseButton onClick={closeModalHandler}>
					<img src={images.profile.deleteIcon} />
				</StyledCloseButton>
				<StyledRegistButton
					onClick={() => navigation('/community/free')}
					disabled={!isRegisterButtonEnabled}
					isActive={isActive}
				>
					<p>등록</p>
				</StyledRegistButton>
			</StyledHeaderContainer>
			<TitleInput onChange={titleInputChangeHandler} />
			<ContentInput onChange={contentInputChangeHandler} showURLInput={false} />
			<StyledContentLengthContainer>
				<StyledContentLengthImg src={images.community.contentLength} />
				<StyledContentLengthP>{contentLength} 글자냥</StyledContentLengthP>
			</StyledContentLengthContainer>
			<ImageContainer />
			<AddImgButton />
		</StyledCreateFreePostContainerTabletPC>
	);
};

export default CreateFreePostModal;

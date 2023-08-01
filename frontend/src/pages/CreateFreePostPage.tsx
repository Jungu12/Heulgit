import Header from '@components/common/Header';
import AddImgButton from '@components/community/AddImgButton';
import ContentInput from '@components/community/ContentInput';
import ImageContainer from '@components/community/ImageContainer';
import RegisterButton from '@components/community/RegisterButton';
import TitleInput from '@components/community/TitleInput';
import { colors } from '@constants/colors';
import { images } from '@constants/images';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledCreateFreePostContainer = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	align-items: center;
	overflow: scroll;

	overflow-x: hidden;
	height: calc(100vh - 56px);
	top: 56px;
`;

const StyledContentLengthContainer = styled.div`
	display: flex;
	align-items: center;
	/* border: solid 1px ${colors.greyScale.grey4}; */
	height: 50px;
	margin-top: 20px;
	margin-left: 30px;
	width: 100%;
`;

const StyledContentLengthImg = styled.img`
	width: 20px;
	height: 20px;
`;

const StyledContentLengthP = styled.p`
	font-size: 15px;

	margin-left: 10px;
`;

const CreateFreePostPage: React.FC = () => {
	// 연결하기
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

	return (
		<StyledCreateFreePostContainer>
			<Header title="자유게시판 게시물 작성">
				<RegisterButton
					onClick={() => navigation('/community/free')}
					disabled={!isRegisterButtonEnabled}
				/>
			</Header>
			<TitleInput onChange={titleInputChangeHandler} />
			<ContentInput onChange={contentInputChangeHandler} showURLInput={false} />
			<StyledContentLengthContainer>
				<StyledContentLengthImg src={images.community.contentLength} />
				<StyledContentLengthP>{contentLength} 글자냥</StyledContentLengthP>
			</StyledContentLengthContainer>
			<ImageContainer />
			<AddImgButton />
		</StyledCreateFreePostContainer>
	);
};

export default CreateFreePostPage;

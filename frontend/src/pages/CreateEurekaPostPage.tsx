import Header from '@components/common/Header';
import AddImgButton from '@components/community/AddImgButton';
import ContentInput from '@components/community/ContentInput';
import ImageContainer from '@components/community/ImageContainer';
import RegisterButton from '@components/community/RegisterButton';
import TitleInput from '@components/community/TitleInput';
import { colors } from '@constants/colors';
import { images } from '@constants/images';
import { EurekaWriteType } from '@typedef/community/eureka.types';
import { isGitHubIssuesOrPullUrl } from '@utils/eureka';
import { authHttp } from '@utils/http';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// 유레카 게시물 작성 컨테이너
const StyledCreateEurekaPostContainer = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	align-items: center;
	overflow: scroll;
	overflow-x: hidden;

	height: calc(100vh - 56px);
	top: 56px;
`;

// 내용 글자 수 컨테이너 ( 이미지 + p태그 )
const StyledContentLengthContainer = styled.div`
	display: flex;
	align-items: center;
	/* border: solid 1px ${colors.greyScale.grey4}; */
	height: 50px;
	margin-top: 20px;
	margin-left: 30px;
	width: 100%;
`;

// 내용 글자 수 이미지
const StyledContentLengthImg = styled.img`
	width: 20px;
	height: 20px;
`;

// 내용 글자 수 p태그
const StyledContentLengthP = styled.p`
	font-size: 15px;

	margin-left: 10px;
`;

const CreateEurekaPostPage: React.FC = () => {
	// 연결하기
	const navigation = useNavigate();
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [contentLength, setContentLength] = useState(0);
	// 선택된 이미지 파일들을 관리하는 상태 변수
	const [selectedImages, setSelectedImages] = useState<FileList | null>(null);

	// post 시 보내야 하는 body
	const [postInput, setPostInput] = useState<EurekaWriteType>({
		title: '',
		content: '',
		link: '',
	});

	const titleInputChangeHandler = (value: string) => {
		// 타이틀 인풋의 입력값을 콘솔에 출력
		console.log('title:', value);
		// setTitle(value);
		setPostInput((prev) => ({
			...prev,
			title: value,
		}));
	};

	const contentInputChangeHandler = (value: string) => {
		// 타이틀 인풋의 입력값을 콘솔에 출력
		console.log('content:', value);
		setContentLength(value.length);
		setPostInput((prev) => ({
			...prev,
			content: value,
		}));
	};

	const linkInputChangeHandler = (value: string) => {
		// 타이틀 인풋의 입력값을 콘솔에 출력
		console.log('content:', value);
		setContentLength(value.length);
		setPostInput((prev) => ({
			...prev,
			link: value,
		}));
	};

	const onClickSubmitButton = useCallback(async () => {
		// const image: string[] = [];
		// 깃허브 이슈, 풀리퀘스트 주소인지 확인
		if (!isGitHubIssuesOrPullUrl(postInput.link)) {
			alert('올바른 주소가 아닙니다.');
			return;
		}
		const formData = new FormData();
		formData.append(
			'data',
			new Blob([JSON.stringify(postInput)], { type: 'application/json' }),
		); // JSON 데이터를 FormData에 추가
		// 선택한 이미지를 FormData에 추가
		if (selectedImages) {
			Object.values(selectedImages).forEach((file) =>
				formData.append('file', file),
			);
		}
		// 글쓰기 완료 되면 게시글 목록으로 이동
		authHttp
			.post('eureka/posts', formData, {
				'Content-Type': 'multipart/form-data',
			})
			.then(() => navigation('/community/eureka'));
	}, [postInput, selectedImages, navigation]);

	// 파일 업로드 함수
	const onUploadImage = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			if (!e.target.files) {
				return;
			}
			const selectedFiles = e.target.files;
			// 길이 10개로 제한
			if (e.target.files.length >= 10) {
				alert('파일은 최대 10개 까지 가능합니다.');
				const truncatedFiles = Array.from(selectedFiles).slice(0, 10);
				setSelectedImages(truncatedFiles as unknown as FileList);
			} else {
				setSelectedImages(selectedFiles);
			}
			console.log(e.target.files);
		},
		[],
	);

	const onUploadImageButtonClick = useCallback(() => {
		if (!inputRef.current) {
			return;
		}
		inputRef.current.click();
	}, []);

	// 등록 버튼 활성화 여부를 결정하는 함수
	const isRegisterButtonEnabled =
		postInput?.title.trim().length > 0 &&
		postInput?.content.trim().length > 0 &&
		postInput.link.trim().length > 0;

	useEffect(() => {
		console.log(postInput);
	}, [postInput]);

	return (
		<StyledCreateEurekaPostContainer>
			<Header title="유레카 게시물 작성">
				<RegisterButton
					onClick={() => onClickSubmitButton()}
					disabled={!isRegisterButtonEnabled}
				/>
			</Header>
			<TitleInput postInput={postInput} onChange={titleInputChangeHandler} />
			<ContentInput
				postInput={postInput}
				onChange={contentInputChangeHandler}
				onChangeLink={linkInputChangeHandler}
			/>
			<StyledContentLengthContainer>
				<StyledContentLengthImg src={images.community.contentLength} />
				<StyledContentLengthP>{contentLength} 글자냥</StyledContentLengthP>
			</StyledContentLengthContainer>
			<ImageContainer />
			<input
				hidden
				type="file"
				multiple
				accept="image/*"
				ref={inputRef}
				onChange={onUploadImage}
			/>
			<AddImgButton onClick={onUploadImageButtonClick} />
		</StyledCreateEurekaPostContainer>
	);
};

export default CreateEurekaPostPage;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import Header from '@components/common/Header';
import BigHeader from '@components/profile/BigHeader';
import CommitTag from '@components/profile/Commit';
import { colors } from '@constants/colors';
import { authHttp } from '@utils/http';
import {
	UserCommitCustomData,
	UserCommitCustomType,
} from '@typedef/profile/user.types';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';

// 기본 데이터
const basicData = [
	{ type: 'algo', description: '알고리즘 풀이' },
	{ type: 'chore', description: '빌드 과정 또는 보조 기능 수정' },
	{ type: 'feat', description: '새로운 기능 개발' },
	{ type: 'fix', description: '버그 수정' },
	{ type: 'style', description: '코드 스타일링' },
	{ type: 'study', description: '공부 및 내용 정리' },
	{ type: 'refactor', description: '코드 리팩토링' },
];

const StyledBox = styled.div`
	height: 100vh;

	overflow-y: scroll;
	scrollbar-width: none; /* 파이어폭스 */
	/* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
	&::-webkit-scrollbar {
		display: none;
	}
	@media (min-width: 768px) {
		display: flex;
		justify-content: center;
	}
`;

const StyledSideL = styled.div`
	height: 100vh;
	left: 0;

	@media (max-width: 767px) {
		display: none;
	}
	@media (min-width: 768px) {
		position: fixed;
		width: 124px;
		background-color: ${colors.primary.primaryLighten};
	}
	@media (min-width: 1200px) {
		position: fixed;
		width: 242px;
		background-color: ${colors.primary.primary};
	}
`;
const StyledSideR = styled.div`
	height: 100vh;
	right: 0;

	@media (max-width: 767px) {
		display: none;
	}
	@media (min-width: 768px) {
		position: fixed;
		width: 124px;
		background-color: ${colors.primary.primaryLighten};
	}
	@media (min-width: 1200px) {
		position: fixed;
		width: 242px;
		background-color: ${colors.primary.primary};
	}
`;

const StyledCommitEditPage = styled.div`
	@media (min-width: 767px) {
		width: 500px;
	}
`;

const StyledEditType = styled.div`
	height: 60px;
`;
const StyledSaveButton = styled.button`
	cursor: pointer;
	margin-right: 20px;
	background-color: transparent;
	font-weight: 500;
	font-size: 15px;
`;

const CommitPageMiddle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10px 20px 60px;
`;

// 커밋 분석 설명
const StyledCommitNoti = styled.div`
	color: ${colors.greyScale.grey4};
	margin-bottom: 10px;
`;
const StyledFooter = styled.div`
	z-index: 1;
	position: fixed;
	bottom: 0px;
	width: 100%;
	height: 50px;

	display: flex;
	justify-content: center;
	align-items: center;
	background-color: white;

	@media (min-width: 768px) {
		width: 500px;
	}
`;
const CommitPlusButton = styled.button`
	cursor: pointer;
	width: 100%;
	height: 40px;

	margin: 10px;
	padding: 10px;
	border: 1px solid;
	border-radius: 5px;

	display: flex;
	justify-content: center;
	align-items: center;
	/* background-color: white; */
	font-weight: bold;

	background-color: ${colors.primary.primary};
	color: white;
`;

// 모달
const customStyles = {
	overlay: {
		zIndex: '99',
		backgroundColor: 'rgba(0, 0, 0, 0.3)', // 오버레이 배경색을 투명하게 설정
	},
	content: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: '20px',
		margin: 'auto',
		maxWidth: '500px',
		height: '450px',
		background: 'rgba(255, 255, 255)',
		backdropFilter: 'blur(10px)',
		zIndex: '99',
		border: 'none',
		borderRadius: '20px',
	},
};
const StyledModalContent = styled.div<{
	$inputContent: boolean;
	$textareaContent: boolean;
}>`
	width: 100%;
	font-size: 20px;
	div {
	}
	label {
		margin: 30px 0 10px 0;
	}
	input,
	textarea {
		border: 2px solid;
		border-radius: 10px;
		padding: 10px;
		border-color: ${(props) =>
			props.$textareaContent ? colors.primary.primary : colors.greyScale.grey3};
	}

	textarea {
		height: 100px;
		resize: none;
	}

	textarea:focus,
	input:focus {
		outline: 1px solid ${colors.primary.primary};
		border: 2px solid ${colors.primary.primary};
	}
`;
const StyledModalItem = styled.div`
	display: flex;
	flex-direction: column;
	div {
		height: 25px;
	}
`;
const StyledModalButtonItem = styled.div`
	display: flex;
	justify-content: end;
	button {
		border-radius: 10px;
		margin: 10px;
		padding: 10px;
	}
	button.modal-close {
		background-color: ${colors.point.red};
		color: white;
		cursor: pointer;
	}
	button.modal-submit {
		color: white;
		background-color: ${colors.primary.primary};
		cursor: pointer;
	}
	button.modal-submit:disabled {
		background-color: ${colors.primary.primaryLighten};
		cursor: default;
	}
`;

const CommitEditPage = () => {
	const navigation = useNavigate();
	const id = useSelector((state: RootState) => state.user.user?.githubId);

	const [commitTags, setCommitTags] = useState<UserCommitCustomType[]>();
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newCommit, setNewCommit] = useState({ type: '', description: '' });
	const [errorMessage, setErrorMessage] = useState('');

	// 커밋 메시지 불러오기
	useEffect(() => {
		authHttp
			.get<UserCommitCustomData[]>('users/commit-type') // API 요청
			.then((response) => {
				if (response.length < 1) {
					setCommitTags(basicData);
				} else {
					setCommitTags(response); // 받아온 데이터를 commitTags 상태에 설정
				}
			})
			.catch((error) => {
				console.error('커밋 메시지를 불러오지 못했습니다.', error);
			});
	}, []);

	const $inputContent = Boolean(newCommit.type);
	const $textareaContent = Boolean(newCommit.description);
	const isSubmitDisabled =
		!newCommit.type ||
		!newCommit.description ||
		(commitTags && commitTags.some((tag) => tag.type === newCommit.type));

	// 모달
	const handleOpenModal = () => {
		setIsModalOpen(true);
		setErrorMessage('');
	};
	const handleCloseModal = () => {
		setNewCommit({ type: '', description: '' });
		setIsModalOpen(false);
	};

	// 커밋 추가
	const handleAddCommit = () => {
		if (newCommit.type && newCommit.description) {
			setCommitTags((prevTags) => [
				...(prevTags || []), // prevTags가 undefined인 경우 빈 배열로 초기화
				{ ...newCommit, type: `${newCommit.type}`, id: Date.now() },
			]);
			setNewCommit({ type: '', description: '' });
			setIsModalOpen(false);
			setErrorMessage('');
		}
	};

	// 커밋 삭제
	const handleDeleteCommitTag = (idToDelete: string) => {
		setCommitTags((prevTags) =>
			(prevTags || []).filter((tag) => tag.type !== idToDelete),
		);
	};

	// 커밋 메시지 저장
	const handleSaveButtonClick = () => {
		authHttp
			.post('users/commit-custom', commitTags) // API 요청
			.then(() => {
				navigation(`/profiles/${id}`);
			})
			.catch((error) => {
				console.error('커밋 메시지 저장에 실패했습니다.', error);
			});
	};

	// 화면 사이즈별 타이틀 변환
	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<StyledBox>
			<StyledSideL>
				<div>네비게이션</div>
			</StyledSideL>

			<StyledCommitEditPage>
				<StyledEditType>
					{windowWidth <= 768 ? (
						<Header title={'커밋 메시지 설정'}>
							<StyledSaveButton onClick={handleSaveButtonClick}>
								저장
							</StyledSaveButton>
						</Header>
					) : (
						<BigHeader title={'커밋 메시지 설정'}>
							<StyledSaveButton onClick={handleSaveButtonClick}>
								저장
							</StyledSaveButton>
						</BigHeader>
					)}
				</StyledEditType>

				<CommitPageMiddle>
					<StyledCommitNoti>
						커밋 타입 뒤에 ':'을 작성해야 분석이 가능합니다. (feat:설명)
					</StyledCommitNoti>
					{/* CommitTag 목록을 매핑하여 렌더링 */}
					{commitTags &&
						commitTags.map((tag) => (
							<CommitTag
								key={tag.type}
								type={tag.type}
								description={tag.description}
								onClickDeleteButton={() => handleDeleteCommitTag(tag.type)}
							/>
						))}
				</CommitPageMiddle>
				<StyledFooter>
					<CommitPlusButton onClick={handleOpenModal}>
						커밋 메시지 추가
					</CommitPlusButton>
				</StyledFooter>
			</StyledCommitEditPage>
			<StyledSideR>
				<div>카테고리</div>
			</StyledSideR>

			{/* 모달 */}
			<ReactModal
				isOpen={isModalOpen}
				style={customStyles}
				onRequestClose={handleCloseModal}
				contentLabel="커밋 메시지 추가"
			>
				<StyledModalContent
					$inputContent={$inputContent}
					$textareaContent={$textareaContent}
				>
					<StyledModalItem>
						<label htmlFor="committype">커밋 타입</label>
						<input
							maxLength={45}
							type="text"
							id="commitType"
							value={newCommit.type}
							placeholder="커밋 타입을 입력해주세요."
							onChange={(e) => {
								const newtype = e.target.value;
								setNewCommit({ ...newCommit, type: newtype });

								// 타이틀 중복 검사
								if (commitTags) {
									const isDuplicate = commitTags.some(
										(tag) => tag.type === `${newtype}`,
									);

									if (isDuplicate) {
										setErrorMessage('중복되는 커밋 타입이 있습니다.');
									} else {
										setErrorMessage('');
									}
								}
							}}
						/>
						<div
							style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}
						>
							{errorMessage}
						</div>
					</StyledModalItem>
					<StyledModalItem>
						<label htmlFor="commitDescription">타입 설명</label>
						<textarea
							maxLength={255}
							id="commitDescription"
							value={newCommit.description}
							placeholder="커밋 타입에 대한 설명을 입력해주세요."
							onChange={(e) =>
								setNewCommit({ ...newCommit, description: e.target.value })
							}
						/>
					</StyledModalItem>
					<StyledModalButtonItem>
						<button onClick={handleCloseModal} className="modal-close">
							취소
						</button>
						<button
							onClick={handleAddCommit}
							className="modal-submit"
							disabled={isSubmitDisabled}
						>
							완료
						</button>
					</StyledModalButtonItem>
				</StyledModalContent>
			</ReactModal>
		</StyledBox>
	);
};

export default CommitEditPage;

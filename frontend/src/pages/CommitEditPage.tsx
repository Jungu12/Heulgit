import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '@components/common/Header';
import BigHeader from '@components/profile/BigHeader';
import CommitTag from '@components/profile/Commit';
import { colors } from '@constants/colors';

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

const StyledEditTitle = styled.div`
	height: 60px;
`;
const StyledSaveButton = styled.button`
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
	width: 100%;
	height: 35px;

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

const CommitEditPage = () => {
	// CommitTag 목록 -> 상태로 관리
	const [commitTags, setCommitTags] = useState([
		{ id: 1, title: '# feat', detail: '새로운 기능 개발' },
		{ id: 2, title: '# fix', detail: '버그 수정' },
		{ id: 3, title: '# docs', detail: '문서 작업' },
		{ id: 4, title: '# style', detail: '코드 스타일링' },
		{ id: 5, title: '# refactor', detail: '코드 리팩토링' },
		{ id: 6, title: '# test', detail: '테스트 코드 작성' },
		{
			id: 7,
			title: '# chore',
			detail:
				'필드 스크립트, 패키지 매니저 등 설정 파일 수정... 계속길어지면어떻게바뀌지 두줄까지 확인 ',
		},
		{
			id: 8,
			title: '# test',
			detail:
				'일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십(40자 제한하기)',
		},
	]);

	// CommitTag 삭제
	const handleDeleteCommitTag = (idToDelete: number) => {
		setCommitTags((prevTags) =>
			prevTags.filter((tag) => tag.id !== idToDelete),
		);
	};

	// 화면 사이즈별 타이틀 변환
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
				<StyledEditTitle>
					{windowWidth <= 768 ? (
						<Header title={'커밋 메시지 설정'}>
							<StyledSaveButton>저장</StyledSaveButton>
						</Header>
					) : (
						<BigHeader title={'커밋 메시지 설정'}>
							<StyledSaveButton>저장</StyledSaveButton>
						</BigHeader>
					)}
				</StyledEditTitle>

				<CommitPageMiddle>
					{/* CommitTag 목록을 매핑하여 렌더링 */}
					{commitTags.map((tag) => (
						<CommitTag
							key={tag.id}
							title={tag.title}
							detail={tag.detail}
							onClickDeleteButton={() => handleDeleteCommitTag(tag.id)}
						/>
					))}
				</CommitPageMiddle>
				<StyledFooter>
					<CommitPlusButton>커밋 메시지 추가</CommitPlusButton>
				</StyledFooter>
			</StyledCommitEditPage>
			<StyledSideR>
				<div>카테고리</div>
			</StyledSideR>
		</StyledBox>
	);
};

export default CommitEditPage;

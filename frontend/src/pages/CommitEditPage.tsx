import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '@components/common/Header';
import CommitTag from '@components/profile/Commit';
import { colors } from '@constants/colors';
// import { colors } from '@constants/colors';

const StyledCommitEditPage = styled.div`
	/* background-color: ${colors.greyScale.grey2}; */
`;
const StyledHeader = styled.div`
	width: 100%;
	height: 56px;
	margin-bottom: 10px;
`;

const CommitPageMiddle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0 20px 50px;
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
`;

// const CommitPlusButton = styled.button`
// 	width: 100%;
// 	height: 35px;

// 	margin: 10px;
// 	padding: 10px;
// 	border: 1px solid;
// 	border-radius: 5px;

// 	display: flex;
// 	justify-content: center;
// 	align-items: center;
// 	/* background-color: white; */
// 	font-weight: bold;

// 	background-color: ${colors.primary.primary};
// 	color: white;
// `;

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
				'필드 스크립트, 패키지 매니저 등 설정 파일 수정... 계속길어지면어떻게바뀌지 두줄까지 확인했고 세줄 이상은 어떻게 되려나 그런데 세줄 이상 쓸 일이 있기는 할까 모르겠다',
		},
		{ id: 8, title: '# test', detail: '테스트 코드 작성' },
	]);

	// CommitTag 삭제
	const handleDeleteCommitTag = (idToDelete: number) => {
		setCommitTags((prevTags) =>
			prevTags.filter((tag) => tag.id !== idToDelete),
		);
	};

	// const handleSubmitCommit = (title: string, detail: string) => {
	// 	// 새로운 CommitTag를 추가합니다.
	// 	const newTag = {
	// 		id: commitTags.length + 1, // 새로운 ID를 부여하거나 다른 방식으로 고유한 ID를 생성하세요.
	// 		title: `# ${title}`,
	// 		detail,
	// 	};
	// 	setCommitTags((prevTags) => [...prevTags, newTag]);
	// };

	return (
		<StyledCommitEditPage>
			<StyledHeader>
				<Header title={'커밋 메시지 설정'} children={'저장'}></Header>
			</StyledHeader>
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
			<StyledFooter></StyledFooter>
		</StyledCommitEditPage>
	);
};

export default CommitEditPage;

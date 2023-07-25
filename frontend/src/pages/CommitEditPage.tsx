import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
	height: 55px;
`;
const BackButton = styled.button``;

const CommitPageMiddle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const CommitConvention = styled.div`
	display: flex;
	justify-content: space-between;
	border: 1px solid;
	border-radius: 5px;
	width: 410px;
	height: 55px;
	padding: 5px;
`;
const CommitDescription = styled.div`
	flex-direction: column;
`;
const CommitTag = styled.div`
	border: 1px solid;
	border-radius: 10px;
	height: 21px;
	width: 50px;
`;

const CommitPageLow = styled.div`
	display: flex;
	justify-content: center;
	position: fixed;
	bottom: 0;
	width: 100%;
	padding: 10px;
`;

const CommitPlusBox = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid;
	border-radius: 5px;
	width: 410px;
`;
const Delete = styled.button``;

const CommitEditPage = () => {
	return (
		<div>
			<Header>
				<BackButton>◀</BackButton>
				커밋 메시지 설정
			</Header>
			<hr />
			<CommitPageMiddle>
				<CommitConvention>
					<CommitDescription>
						<CommitTag>#feat </CommitTag>
						<div>새로운 기능 개발</div>
					</CommitDescription>
					<Delete>삭제</Delete>
				</CommitConvention>
				<CommitConvention>
					<CommitDescription>
						<CommitTag>#feat </CommitTag>
						<div>새로운 기능 개발</div>
					</CommitDescription>
					<Delete>삭제</Delete>
				</CommitConvention>
			</CommitPageMiddle>
			<CommitPageLow>
				<CommitPlusBox>커밋 메시지 추가</CommitPlusBox>
			</CommitPageLow>
		</div>
	);
};

export default CommitEditPage;

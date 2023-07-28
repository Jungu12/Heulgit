import { useNavigate } from 'react-router-dom';
import Header from '@components/common/Header';
import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
	width: 100%;
	height: 56px;
	margin-bottom: 10px;
`;

const StyledActivityMenu = styled.div`
	display: flex;
	align-items: center;
	height: 40px;
	margin: 10px;
`;

const MyActivityPage = () => {
	const navigation = useNavigate();

	return (
		<div>
			<StyledHeader>
				<Header title={'내 활동'}></Header>
			</StyledHeader>
			<div>
				<StyledActivityMenu onClick={() => navigation('/profiles/1/like-repo')}>
					좋아요 한 흘깃
				</StyledActivityMenu>
				<StyledActivityMenu onClick={() => navigation('/profiles/1/like-post')}>
					좋아요 한 게시물
				</StyledActivityMenu>
				<StyledActivityMenu onClick={() => navigation('/profiles/1/comment')}>
					내가 작성한 댓글
				</StyledActivityMenu>
				<StyledActivityMenu>로그아웃</StyledActivityMenu>
			</div>
		</div>
	);
};

export default MyActivityPage;

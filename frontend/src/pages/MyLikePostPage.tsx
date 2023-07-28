// import { useNavigate } from 'react-router-dom';
import Header from '@components/common/Header';
import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
	width: 100%;
	height: 56px;
	background-color: white;
	margin-bottom: 10px;
`;
const StyledLikePostCategory = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: flex-end;
	height: 50px;
`;

const MyLikePostPage = () => {
	return (
		<div>
			<StyledHeader>
				<Header title={'좋아요 한 게시물'}></Header>
			</StyledHeader>
			<StyledLikePostCategory>
				<div>유레카</div>
				<div>자유</div>
			</StyledLikePostCategory>
			<hr />
			<div>Post</div>
		</div>
	);
};

export default MyLikePostPage;

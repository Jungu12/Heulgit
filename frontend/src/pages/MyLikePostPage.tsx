import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
	height: 55px;
`;
const BackButton = styled.button``;
const StyledLikePostCategory = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: flex-end;
	height: 50px;
`;

const MyLikePostPage = () => {
	return (
		<div>
			<Header>
				<BackButton>◀</BackButton>
				커뮤니티
			</Header>
			<hr />
			<StyledLikePostCategory>
				<div>유레카</div>
				<div>자유</div>
			</StyledLikePostCategory>
			<div>Post</div>
			<hr />
		</div>
	);
};

export default MyLikePostPage;
